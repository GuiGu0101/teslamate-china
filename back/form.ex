defmodule TeslaMateWeb.AddressLive.Form do
  @moduledoc """
  LiveView for address form handling, supporting both creation and editing of addresses.
  In creation mode, it checks for existing addresses with the same OSM ID to avoid duplicates.
  """

  use TeslaMateWeb, :live_view

  require Logger
  import Ecto.Query, warn: false

  alias TeslaMateWeb.AddressLive

  alias TeslaMate.Locations
  alias TeslaMate.Settings.GlobalSettings
  alias TeslaMate.Locations.Address
  alias TeslaMate.Log.{Drive, ChargingProcess}
  alias TeslaMate.Repo

  on_mount {TeslaMateWeb.InitAssigns, :locale}

  @impl true
  def mount(
        %{"lat" => lat, "lng" => lng, "type" => type, "link_id" => link_id},
        %{"settings" => settings},
        socket
      ) do
    {:ok, addresses} = Locations.search_address(%{latitude: lat, longitude: lng})

    address = %Address{
      latitude: Decimal.new(lat),
      longitude: Decimal.new(lng)
    }

    {:ok, base_assigns(socket, address, addresses, settings, type, link_id, :new)}
  end

  @impl true
  def mount(%{"id" => id}, %{"settings" => settings}, socket) do
    address = Locations.get_address!(id)
    {:ok, addresses} = Locations.search_address(address)

    {:ok, base_assigns(socket, address, addresses, settings, "", "", :edit)}
  end

  @impl true
  def handle_params(_params, uri, socket) do
    referrer =
      case {get_connect_params(socket)["referrer"], uri} do
        {uri, uri} -> nil
        {"", _uri} -> nil
        {referrer, _} when is_binary(referrer) -> referrer
        _ -> nil
      end

    {:noreply, assign(socket, redirect_to: referrer || Routes.car_path(socket, :index))}
  end

  @impl true
  def handle_event("validate", %{"address" => params}, socket) do
    address =
      params
      |> Map.put("display_name", Locations.Geocoder.get_display_name(params, params["name"]))

    Logger.debug("final params: #{inspect(address)}")

    changeset =
      socket.assigns.address
      |> Locations.change_address(address)
      |> Map.put(:action, :update)

    {:noreply, assign(socket, changeset: changeset, show_errors: false)}
  end

  def handle_event("save", %{"address" => params}, socket) do
    %{action: action} = socket.assigns

    # params =
    #   case action do
    #     :new -> Map.merge(address_base, params)
    #     _ -> params
    #   end

    Logger.debug("final params: #{inspect(params)}")

    with {:ok, _address, _changeset} <- validate(params, socket),
         {:ok, socket} <- save(socket) do
      {:noreply, socket}
    else
      {:error, %Ecto.Changeset{} = changeset} ->
        Logger.debug("validate fail: #{inspect(changeset)}")
        {:noreply, assign(socket, changeset: changeset, show_errors: true)}
    end
  end

  def handle_event("search", %{"lat" => lat, "lng" => lng}, socket) do
    case Locations.search_address(%{latitude: lat, longitude: lng}) do
      {:ok, addresses} ->
        Logger.debug("AMap search result: #{inspect(addresses)}")
        {:noreply, assign(socket, addresses: addresses)}

      {:error} ->
        {:noreply, socket}
    end
  end

  def handle_event("new_address", _params, socket) do
    Logger.debug("handle_event new_address: #{inspect(socket.assigns.changeset)}")
    {:noreply, socket}
  end

  def handle_event("clear_notice", _params, socket) do
    {:noreply, assign(socket, existing_address_notice: nil)}
  end

  def handle_event("change_address", address, socket) do
    base_changes = socket.assigns.address_base_changeset.changes

    # 添加显示名称
    address_with_display_name =
      Map.put(
        address,
        "display_name",
        Locations.Geocoder.get_display_name(base_changes, address["name"])
      )

    # 根据条件移除OSM数据
    cleaned_address = clean_osm_data(address_with_display_name, socket)

    # 在新增模式下，检查 osm_id 是否有对应的记录
    {socket, found_existing_address} = check_existing_address(socket, cleaned_address)

    # 创建新的changeset
    new_changeset =
      socket.assigns.address
      |> Locations.change_address(cleaned_address)
      |> Map.put(:action, :update)

    {:noreply,
     assign(socket,
       changeset: merge_changesets(new_changeset, socket),
       show_errors: false,
       found_existing_address: found_existing_address
     )}
  end

  defp clean_osm_data(address_data, socket) do
    if socket.assigns.address.osm_id != "unknown" and socket.assigns.action != :new do
      address_data
      |> Map.delete("osm_id")
      |> Map.delete("osm_type")
    else
      address_data
    end
  end

  defp check_existing_address(socket, cleaned_address) do
    if socket.assigns.action == :new and
         Map.has_key?(cleaned_address, "osm_id") and
         Map.has_key?(cleaned_address, "osm_type") do
      osm_id = cleaned_address["osm_id"]
      osm_type = cleaned_address["osm_type"]

      case Locations.find_address_by_osm(osm_id, osm_type) do
        %Address{} = existing_address ->
          new_socket =
            socket
            |> assign(:existing_address_id, existing_address.id)
            |> assign(
              :existing_address_notice,
              gettext(
                "Found existing address: %{name}. This will be linked instead of creating a new one.",
                name: existing_address.name
              )
            )

          {new_socket, true}

        nil ->
          {socket
           |> assign(:existing_address_id, nil)
           |> assign(:existing_address_notice, nil), false}
      end
    else
      {socket
       |> assign(:existing_address_id, nil)
       |> assign(:existing_address_notice, nil), false}
    end
  end

  # Private

  defp base_assigns(
         socket,
         %Address{} = address,
         list,
         %GlobalSettings{} = settings,
         type,
         link_id,
         action
       ) do
    {address_base_changeset, changeset} = create_changesets(address, action)

    assigns = %{
      settings: settings,
      address: address,
      address_base_changeset: address_base_changeset,
      addresses: list,
      changeset: changeset,
      show_errors: false,
      show_modal: false,
      action: action,
      type: type,
      link_id: link_id,
      connected?: connected?(socket),
      page_title: address.name || gettext("Addresses"),
      existing_address_id: nil,
      found_existing_address: false,
      existing_address_notice: nil
    }

    assign(socket, assigns)
  end

  defp create_changesets(address, :new) do
    base_changeset = get_base(address)
    changeset = Locations.change_address(address)
    {base_changeset, Ecto.Changeset.merge(changeset, base_changeset)}
  end

  defp create_changesets(address, :edit) do
    changeset = Locations.change_address(address)
    {changeset, changeset}
  end

  defp get_base(%Address{} = address) do
    case Locations.find_address(address) do
      {:ok, find_address} ->
        attrs = find_address |> Map.from_struct()
        Locations.change_address(address, attrs)

      {:error, _reason} ->
        # 如果查找失败，返回空 changeset
        Locations.change_address(address)
    end
  end

  defp merge_changesets(new_changeset, socket) do
    %{changeset: changeset, address_base_changeset: address_base_changeset} = socket.assigns

    address_base_changeset
    |> Ecto.Changeset.merge(changeset)
    |> Ecto.Changeset.merge(new_changeset)
  end

  defp validate(params, %{assigns: assigns}) do
    Logger.debug("validate base: #{inspect(assigns.address_base_changeset.changes)}")

    # 只在新建模式下添加 raw 字段
    params =
      case assigns.action do
        :new ->
          raw_value = Map.get(assigns.address_base_changeset.changes, :raw, %{})
          Map.put(params, "raw", raw_value)

        :edit ->
          params
      end

    Logger.debug("validate: #{inspect(params)}")

    with changeset <-
           (case assigns.action do
              :new -> Locations.change_address(%Address{}, params)
              :edit -> Locations.change_address(assigns.address, params)
            end) do
      with {:ok, address} <- Ecto.Changeset.apply_action(changeset, :update) do
        Logger.debug("validate done")
        {:ok, address, changeset}
      end
    end
  end

  defp save(%{assigns: assigns} = socket) do
    %{
      changeset: %{params: params},
      action: action,
      address: address,
      type: type,
      link_id: link_id
    } =
      assigns

    Logger.debug("save_address: #{inspect(params)}")
    Logger.warning("goto: #{Routes.live_path(socket, AddressLive.Index)}")

    # 使用事务处理
    result =
      TeslaMate.Repo.transaction(fn ->
        {saved_address, final_action} = save_address(action, address, params, assigns)
        address_id_to_use = determine_address_id(action, saved_address.id, assigns)
        update_linked_records(type, link_id, address_id_to_use)

        {:ok, saved_address, saved_address.name, final_action}
      end)

    handle_save_result(result, socket, link_id)
  end

  defp save_address(:new, _address, params, assigns) do
    existing_address_id = Map.get(assigns, :existing_address_id)

    if existing_address_id != nil do
      # 使用现有地址，不创建新地址
      existing_address = Locations.get_address!(existing_address_id)
      {existing_address, :existing}
    else
      # 创建新地址
      {:ok, saved} = Locations.create_address(params)
      {saved, :new}
    end
  end

  defp save_address(:edit, address, params, _assigns) do
    {:ok, saved} = Locations.update_address(address, params)
    {saved, :edit}
  end

  defp determine_address_id(:new, _new_address_id, assigns) do
    existing_address_id = Map.get(assigns, :existing_address_id)

    if existing_address_id != nil do
      existing_address_id
    else
      _new_address_id
    end
  end

  defp determine_address_id(:edit, address_id, _assigns) do
    address_id
  end

  defp update_linked_records(type, link_id, address_id) do
    case type do
      "drive_start" ->
        Logger.debug("更新行程起点地址: drive_id=#{link_id}, address_id=#{address_id}")

        Repo.update_all(
          from(d in Drive, where: d.id == ^link_id),
          set: [start_address_id: address_id]
        )

      "drive_end" ->
        Logger.debug("更新行程终点地址: drive_id=#{link_id}, address_id=#{address_id}")

        Repo.update_all(
          from(d in Drive, where: d.id == ^link_id),
          set: [end_address_id: address_id]
        )

      "charge" ->
        Logger.debug("更新充电地址: charge_id=#{link_id}, address_id=#{address_id}")

        Repo.update_all(
          from(c in ChargingProcess, where: c.id == ^link_id),
          set: [address_id: address_id]
        )

      _ ->
        Logger.debug("无需更新关联记录")
    end
  end

  defp handle_save_result(
         {:ok, {:ok, %Address{name: name} = address, _name, final_action}},
         socket,
         _link_id
       ) do
    socket =
      socket
      |> assign(address: address)
      |> put_flash(:success, flash_msg(final_action, name))
      |> push_navigate(to: Routes.live_path(socket, AddressLive.Index))

    {:ok, socket}
  end

  defp handle_save_result({:error, reason}, socket, link_id) do
    Logger.debug("save_error(#{link_id}): #{inspect(reason)}")

    socket =
      socket
      |> assign(changeset: reason, show_errors: true)
      |> put_flash(:error, "地址保存失败")

    {:ok, socket}
  end

  @spec flash_msg(:new | :edit | :existing, String.t()) :: String.t()
  defp flash_msg(:new, name), do: gettext("Address \"%{name}\" created", name: name)
  defp flash_msg(:edit, name), do: gettext("Address \"%{name}\" updated", name: name)
  defp flash_msg(:existing, name), do: gettext("Address \"%{name}\" linked", name: name)
end
