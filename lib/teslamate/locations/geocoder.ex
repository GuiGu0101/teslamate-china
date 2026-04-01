defmodule TeslaMate.Locations.Geocoder do
  use Tesla, only: [:get]

  require Logger

  @version Mix.Project.config()[:version]

  adapter Tesla.Adapter.Finch, name: TeslaMate.HTTP, receive_timeout: 30_000

  plug Tesla.Middleware.BaseUrl, "https://restapi.amap.com/v3"
  plug Tesla.Middleware.Headers, [{"user-agent", "TeslaMate/#{@version}"}]
  plug Tesla.Middleware.JSON
  plug Tesla.Middleware.Logger, debug: true, log_level: &log_level/1

  alias TeslaMate.Locations.Address

  def reverse_lookup(lat, lon, lang \\ "en") do
    amapConfig = Application.get_env(:teslamate, :amap_web_api)
    Logger.debug("AMap Info: #{amapConfig[:api_key]}")

    opts = [
      key: amapConfig[:api_key],
      location: "#{lon},#{lat}",
      extensions: "all",
      poitype: "011100|120000",
      radius: 200,
      roadlevel: 0
    ]

    with {:ok, address_raw} <- query("/geocode/regeo", lang, opts),
         {:ok, address} <- into_address(address_raw),
         address <- check_unknown_address(address, lat, lon) do
      {:ok, address}
    end
  end

  defp check_unknown_address(address, lat, lon) do
    if address.osm_id == "unknown" do
      address
      |> Map.put(:latitude, lat)
      |> Map.put(:longitude, lon)
    else
      address
    end
  end

  def search_poi(lat, lon, lang \\ "en") do
    amapConfig = Application.get_env(:teslamate, :amap_web_api)
    Logger.debug("AMap Info: #{amapConfig[:api_key]}")

    opts = [
      key: amapConfig[:api_key],
      location: "#{lon},#{lat}",
      extensions: "all",
      types: "011100|120000|060100",
      radius: 200
    ]

    with {:ok, address_raw} <- query("/place/around", lang, opts),
         {:ok, addresses} <- address_list(address_raw) do
      {:ok, addresses}
    end
  end

  def details(addresses, lang) when is_list(addresses) do
    osm_ids =
      addresses
      |> Enum.reject(fn %Address{} = a -> a.osm_id == nil or a.osm_type in [nil, "unknown"] end)
      |> Enum.map(fn %Address{} = a ->
        "#{String.upcase(String.at(a.osm_type, 0))}#{a.osm_id}"
      end)
      |> Enum.join(",")

    params = [
      osm_ids: osm_ids,
      format: :jsonv2,
      addressdetails: 1,
      extratags: 1,
      namedetails: 1,
      zoom: 19
    ]

    with {:ok, raw_addresses} <- query("/lookup", lang, params) do
      addresses =
        Enum.map(raw_addresses, fn attrs ->
          case into_address(attrs) do
            {:ok, address} -> address
            {:error, reason} -> throw({:invalid_address, reason})
          end
        end)

      {:ok, addresses}
    end
  catch
    {:invalid_address, reason} ->
      {:error, reason}
  end

  def get_display_name(address, name) do
    display_names = [
      name,
      get_first(address, [:house_number, "house_number"]),
      get_first(address, [:road, "road"]),
      get_first(address, [:neighbourhood, "neighbourhood"]),
      get_first(address, [:city, "city"]),
      get_first(address, [:county, "county"]),
      get_first(address, [:state, "state"]),
      get_first(address, [:postcode, "postcode"]),
      get_first(address, [:country, "country"])
    ]

    Logger.debug("get_display_name: #{inspect(address)} #{get_in(address, ["country"])}")

    list_join(display_names, ", ", "")
  end

  def get_display_name(address) do
    get_display_name(address, get_first(address, [:name, "name"]))
  end

  defp query(url, lang, params) do
    case get(url, query: params, headers: [{"Accept-Language", lang}]) do
      {:ok, %Tesla.Env{status: 200, body: %{"status" => "1"} = reason}} ->
        {:ok, reason}

      {:ok, %Tesla.Env{status: 200, body: %{"status" => "0"} = reason}} ->
        Logger.warning("GET #{url} Failed: query by #{inspect(params)}")
        {:error, Map.put(reason, "error", "Unable to geocode")}

      {:ok, %Tesla.Env{body: %{"error" => reason}}} ->
        {:error, reason}

      {:ok, %Tesla.Env{} = env} ->
        {:error, reason: "Unexpected response", env: env}

      {:error, reason} ->
        {:error, reason}
    end
  end

  # Address Formatting
  # Source: https://github.com/OpenCageData/address-formatting/blob/master/conf/components.yaml

  @road_aliases [
    "road",
    "footway",
    "street",
    "street_name",
    "residential",
    "path",
    "pedestrian",
    "road_reference",
    "road_reference_intl",
    "square",
    "place"
  ]

  @county_aliases [
    "city",
    "county",
    "county_code",
    "department"
  ]

  defp into_address(%{"error" => "Unable to geocode"} = raw) do
    unknown_address = %{
      display_name: "Unknown",
      osm_type: "unknown",
      osm_id: 0,
      latitude: 0.0,
      longitude: 0.0,
      raw: raw
    }

    {:ok, unknown_address}
  end

  defp into_address(%{"error" => reason}) do
    {:error, {:geocoding_failed, reason}}
  end

  defp into_address(%{"regeocode" => raw}) do
    try do
      pois = get_in(raw, ["pois"])
      aois = get_in(raw, ["aois"])
      street = get_in_not_empty_list(raw, ["addressComponent", "streetNumber"])
      roads = get_in(raw, ["roads"])
      location = get_point(pois, aois, roads)

      address = %{
        osm_id: get_in_not_empty_list(location, ["id"]),
        osm_type: get_in_not_empty_list(location, ["type"]),
        latitude: get_in_not_empty_list(location, ["latitude"]),
        longitude: get_in_not_empty_list(location, ["longitude"]),
        name: get_in_not_empty_list(location, ["name"]),
        house_number:
          street
          |> get_first(["number"]),
        road: street |> get_first(@road_aliases),
        neighbourhood: raw["addressComponent"] |> get_in_not_empty_list(["township"]),
        city: raw["addressComponent"] |> get_first(["district"]),
        county: raw["addressComponent"] |> get_first(@county_aliases),
        postcode: get_in_not_empty_list(raw, ["addressComponent", "towncode"]),
        state:
          raw["addressComponent"]
          |> get_first(["state", "province", "state_code"]),
        state_district: get_in_not_empty_list(raw, ["address", "state_district"]),
        country: raw["addressComponent"] |> get_first(["country", "country_name"]),
        raw: raw
      }

      address = Map.put(address, :display_name, get_display_name(address))

      {:ok, address}
    rescue
      e ->
        Logger.warning(~c"Format address fail: #{inspect(e)}, by: #{inspect(raw)}")
        {:error, e}
    end
  end

  defp address_list(%{"error" => "Unable to geocode"} = raw) do
    unknown_address = %{
      display_name: "Unknown",
      osm_type: "unknown",
      osm_id: 0,
      latitude: 0.0,
      longitude: 0.0,
      raw: raw
    }

    {:ok, unknown_address}
  end

  defp address_list(%{"error" => reason}) do
    {:error, {:geocoding_failed, reason}}
  end

  defp address_list(%{"pois" => pois}) do
    try do
      addresses =
        pois
        |> Enum.map(fn location ->
          lnglat = String.split(get_in(location, ["location"]), ",")

          address = %{
            osm_type: "node",
            osm_id: get_in_not_empty_list(location, ["id"]),
            latitude: Enum.at(lnglat, 1),
            longitude: Enum.at(lnglat, 0),
            name: get_in_not_empty_list(location, ["name"])
          }

          address
        end)

      {:ok, addresses}
    rescue
      e ->
        Logger.warning(~c"Format address fail: #{inspect(e)}, by: #{inspect(pois)}")
        {:error, e}
    end
  end

  defp list_join([item | items], split, str) do
    if length(items) > 0 do
      str = if is_nil(item) != true, do: str <> item <> split, else: str
      list_join(items, split, str)
    else
      if is_nil(item) != true, do: str <> item, else: str
    end
  end

  defp get_first(nil, _aliases), do: nil
  defp get_first(_address, []), do: nil

  defp get_first(address, [key | aliases]) do
    with nil <- get_in_not_empty_list(address, [key]), do: get_first(address, aliases)
  end

  defp get_in_not_empty_list(data, keys) do
    target = get_in(data, keys)
    if is_list(target) and length(target) == 0, do: nil, else: target
  end

  defp to_f(""), do: nil
  defp to_f(str), do: String.to_float(str)

  defp format_location(nil), do: nil

  defp format_location(location) do
    [lng, lat] = String.split(location, ",")

    %{
      "latitude" => to_f(lat),
      "longitude" => to_f(lng)
    }
  end

  defp get_charge_poi(%{"type" => type} = poi) do
    if type == "汽车服务;充电站;充电站" do
      location = format_location(Map.get(poi, "location"))

      %{
        "name" => Map.get(poi, "name"),
        "id" => Map.get(poi, "id"),
        "latitude" => Map.get(location, "latitude"),
        "longitude" => Map.get(location, "longitude"),
        "type" => "node"
      }
    else
      {:error}
    end
  end

  defp get_aoi(%{"type" => type} = aoi) do
    if String.starts_with?(type, "0803") == false do
      location = format_location(Map.get(aoi, "location"))

      %{
        "name" => Map.get(aoi, "name"),
        "id" => Map.get(aoi, "id"),
        "latitude" => Map.get(location, "latitude"),
        "longitude" => Map.get(location, "longitude"),
        "type" => "area"
      }
    else
      {:error}
    end
  end

  defp get_road(%{} = road) do
    location = format_location(Map.get(road, "location"))

    %{
      "name" => Map.get(road, "name"),
      "id" => Map.get(road, "id"),
      "latitude" => Map.get(location, "latitude"),
      "longitude" => Map.get(location, "longitude"),
      "type" => "road"
    }
  end

  defp useMod(fun_name, item) do
    case fun_name do
      :get_charge_poi ->
        get_charge_poi(item)

      :get_aoi ->
        get_aoi(item)

      :get_road ->
        get_road(item)

      _ ->
        %{
          "name" => "未知",
          "id" => "unknown",
          "latitude" => 0.0,
          "longitude" => 0.0,
          "type" => "unknown"
        }
    end
  end

  defp get_loaction(_fun_name, nil), do: nil
  defp get_loaction(_fun_name, []), do: nil

  defp get_loaction(fun_name, [item | items]) do
    with {:error} <- useMod(fun_name, item), do: get_loaction(fun_name, items)
  end

  defp get_point(pois, aois, roads) do
    with nil <- get_loaction(:get_charge_poi, pois),
         nil <- get_loaction(:get_aoi, aois),
         nil <- get_loaction(:get_road, roads) do
      %{
        "name" => "未知",
        "id" => "unknown",
        "latitude" => 0.0,
        "longitude" => 0.0,
        "type" => "unknown"
      }
    end
  end

  defp log_level(%Tesla.Env{} = env) when env.status >= 400, do: :warning
  defp log_level(%Tesla.Env{}), do: :info
end
