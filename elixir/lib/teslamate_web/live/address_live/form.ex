defmodule TeslaMateWeb.AddressLive.Form do
  use TeslaMateWeb, :live_view

  alias TeslaMate.{Locations, Repo}
  alias TeslaMate.Locations.Address
  alias TeslaMate.Log

  on_mount {TeslaMateWeb.InitAssigns, :locale}

  @impl true
  def mount(%{"id" => id}, _session, socket) do
    address = Locations.get_address!(id)
    {:ok, base_assigns(socket, address, :edit)}
  end

  def mount(params, %{"settings" => settings}, socket) do
    lat = params["lat"] || "0.0"
    lng = params["lng"] || "0.0"
    from = params["from"]
    link_id = params["link_id"]

    address = get_complete_address(lat, lng)
    {from, link_record} = validate_source(from, link_id, settings)

    {:ok, base_assigns(socket, address, :new, from, link_record)}
  end

  defp get_complete_address(lat, lng) do
    coordinates = %{latitude: Decimal.new(lat), longitude: Decimal.new(lng)}

    case Locations.find_address(coordinates) do
      {:ok, %Address{} = address} -> address
      {:error, _reason} -> %Address{latitude: Decimal.new(lat), longitude: Decimal.new(lng)}
    end
  end

  defp validate_source(nil, nil, _settings), do: {nil, nil}

  defp validate_source("drive_start", link_id, _settings) when not is_nil(link_id) do
    {"drive_start", Log.get_drive!(link_id)}
  end

  defp validate_source("drive_end", link_id, _settings) when not is_nil(link_id) do
    {"drive_end", Log.get_drive!(link_id)}
  end

  defp validate_source("charge", link_id, _settings) when not is_nil(link_id) do
    {"charge", Log.get_charging_process!(link_id)}
  end

  defp validate_source(_, _, _), do: {nil, nil}

  defp base_assigns(socket, %Address{} = address, action, from \\ nil, link_record \\ nil)
       when action in [:new, :edit] do
    {:ok, addresses} = Locations.search_address(address)

    assign(socket, %{
      page_title: page_title(action),
      address: address,
      changeset: Locations.change_address(address),
      action: action,
      from: from,
      link_record: link_record,
      redirect_to: redirect_path(from, link_record),
      show_errors: false,
      type: "",
      addresses: addresses,
      existing_address_id: nil
    })
  end

  defp page_title(:new), do: gettext("New Address")
  defp page_title(:edit), do: gettext("Edit Address")

  # v4.3.0 路由中没有 /drive/:id 与 /charge/:id 页面（详情在 Grafana），
  # 保存后统一回到地址列表页
  defp redirect_path("drive_start", %Log.Drive{}), do: ~p"/address"
  defp redirect_path("drive_end", %Log.Drive{}), do: ~p"/address"
  defp redirect_path("charge", %Log.ChargingProcess{}), do: ~p"/address"
  defp redirect_path(_, _), do: ~p"/address"

  @impl true
  def handle_params(_params, _url, socket), do: {:noreply, socket}

  @impl true
  def handle_event("validate", %{"address" => address_params}, socket) do
    changeset =
      socket.assigns.address
      |> Locations.change_address(update_display_name(socket.assigns.address, address_params))
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"address" => address_params}, socket) do
    save_address(socket, socket.assigns.action, address_params)
  end

  def handle_event("search", %{"lat" => lat, "lng" => lng}, socket) do
    case Locations.search_address(%{latitude: lat, longitude: lng}) do
      {:ok, addresses} ->
        {:noreply, assign(socket, addresses: addresses)}

      {:error, _reason} ->
        {:noreply, socket}
    end
  end

  def handle_event("change_address", address_data, socket) do
    changeset =
      socket.assigns.address
      |> Locations.change_address(update_display_name(socket.assigns.address, address_data))

    existing_address_id = get_existing_address_id(address_data)

    {:noreply, assign(socket, changeset: changeset, existing_address_id: existing_address_id)}
  end

  defp get_existing_address_id(%{"osm_id" => osm_id, "osm_type" => osm_type})
       when is_binary(osm_id) and osm_id != "" do
    case Locations.get_address_by_osm(osm_id, osm_type || "node") do
      %Address{id: id} -> id
      _ -> nil
    end
  end

  defp get_existing_address_id(_), do: nil

  defp save_address(socket, :edit, address_params) do
    case Locations.update_address(socket.assigns.address, address_params) do
      {:ok, _address} ->
        socket
        |> put_flash(:info, gettext("Address updated successfully"))
        |> push_navigate(to: ~p"/address")
        |> then(&{:noreply, &1})

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset, show_errors: true)}
    end
  end

  defp save_address(socket, :new, address_params) do
    %{
      from: from,
      link_record: link_record,
      address: current_address,
      existing_address_id: existing_id
    } = socket.assigns

    address_params_with_raw =
      address_params
      |> Map.put("raw", current_address.raw)
      |> Map.put_new("osm_id", current_address.osm_id)
      |> Map.put_new("osm_type", current_address.osm_type)

    result =
      if existing_id do
        # 地址已存在，直接更新并关联
        update_existing_address_with_link(existing_id, address_params_with_raw, from, link_record)
      else
        # 创建新地址并关联（事务保证原子性）
        create_new_address_with_link(address_params_with_raw, from, link_record)
      end

    case result do
      {:ok, address} ->
        {:noreply,
         socket
         |> put_flash(:info, gettext("Address saved successfully"))
         |> assign(
           action: :edit,
           address: address,
           existing_address_id: nil,
           changeset: Locations.change_address(address)
         )
         |> push_patch(to: Routes.live_path(socket, TeslaMateWeb.AddressLive.Form, address.id))}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset, show_errors: true)}

      {:error, reason} ->
        {:noreply,
         socket
         |> put_flash(
           :error,
           gettext("Failed to save address: %{reason}", reason: inspect(reason))
         )
         |> assign(changeset: Locations.change_address(current_address), show_errors: true)}
    end
  end

  defp create_new_address_with_link(address_params, from, link_record) do
    Repo.transaction(fn ->
      with {:ok, address} <- create_new_address(address_params),
           :ok <- link_address_to_record_or_rollback(address.id, from, link_record) do
        address
      else
        {:error, reason} -> Repo.rollback(reason)
      end
    end)
  end

  defp update_existing_address_with_link(address_id, address_params, from, link_record) do
    Repo.transaction(fn ->
      with {:ok, address} <- update_existing_address(address_id, address_params),
           :ok <- link_address_to_record_or_rollback(address_id, from, link_record) do
        address
      else
        {:error, reason} -> Repo.rollback(reason)
      end
    end)
  end

  defp link_address_to_record_or_rollback(_address_id, _from, nil), do: :ok

  defp link_address_to_record_or_rollback(address_id, from, link_record) do
    case link_address_to_record(address_id, from, link_record) do
      :ok -> :ok
      {:error, reason} -> {:error, reason}
    end
  end

  defp update_existing_address(address_id, address_params) do
    Locations.get_address!(address_id) |> Locations.update_address(address_params)
  end

  defp create_new_address(address_params), do: Locations.create_address(address_params)

  defp link_address_to_record(_address_id, _from, nil), do: :ok

  defp link_address_to_record(address_id, from, link_record) do
    result =
      case {from, link_record} do
        {"drive_start", %Log.Drive{} = drive} ->
          Log.update_drive(drive, %{start_address_id: address_id})

        {"drive_end", %Log.Drive{} = drive} ->
          Log.update_drive(drive, %{end_address_id: address_id})

        {"charge", %Log.ChargingProcess{} = charge} ->
          Log.update_charging_process(charge, %{address_id: address_id})

        _ ->
          :ok
      end

    case result do
      {:ok, _} -> :ok
      {:error, %Ecto.Changeset{} = cs} -> {:error, cs}
      _ -> :ok
    end
  end

  # ==================== Helper Functions ====================

  def field_label(:name), do: gettext("Name")
  def field_label(:latitude), do: gettext("Latitude")
  def field_label(:longitude), do: gettext("Longitude")
  def field_label(:house_number), do: gettext("House Number")
  def field_label(:road), do: gettext("Road")
  def field_label(:neighbourhood), do: gettext("Neighbourhood")
  def field_label(:city), do: gettext("City")
  def field_label(:county), do: gettext("County")
  def field_label(:state), do: gettext("State")
  def field_label(:state_district), do: gettext("State District")
  def field_label(:country), do: gettext("Country")
  def field_label(:postcode), do: gettext("Postcode")
  def field_label(:display_name), do: gettext("Display Name")
  def field_label(:osm_id), do: gettext("OSM ID")
  def field_label(:osm_type), do: gettext("OSM Type")
  def field_label(_), do: ""

  def field_placeholder(:name), do: gettext("Official name from map")
  def field_placeholder(_), do: nil

  def update_display_name(%Address{} = address, attrs) do
    updated_address = %{
      address
      | country: Map.get(attrs, "country", address.country),
        state: Map.get(attrs, "state", address.state),
        city: Map.get(attrs, "city", address.city),
        county: Map.get(attrs, "county", address.county),
        neighbourhood: Map.get(attrs, "neighbourhood", address.neighbourhood),
        road: Map.get(attrs, "road", address.road),
        house_number: Map.get(attrs, "house_number", address.house_number),
        name: Map.get(attrs, "name", address.name)
    }

    Map.put(attrs, "display_name", TeslaMate.Locations.Geocoder.get_display_name(updated_address))
  end
end
