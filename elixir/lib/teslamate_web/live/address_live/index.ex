defmodule TeslaMateWeb.AddressLive.Index do
  use TeslaMateWeb, :live_view

  alias TeslaMate.{Locations, Settings}
  alias Settings.GlobalSettings

  alias TeslaMate.Convert

  on_mount {TeslaMateWeb.InitAssigns, :locale}

  @impl true
  def mount(_params, %{"settings" => settings}, socket) do
    assigns = %{
      settings: settings,
      addresses: Locations.list_addresses(),
      page_title: gettext("Addresses")
    }

    {:ok, assign(socket, assigns)}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, %{assigns: %{addresses: addresses}} = socket) do
    address = Locations.get_address!(id)

    case Locations.delete_address(address) do
      {:ok, deleted_address} ->
        addresses = Enum.reject(addresses, &(&1.id == deleted_address.id))
        {:noreply, assign(socket, addresses: addresses)}

      {:error, :has_associated_records} ->
        # 向浏览器返回告警信息
        {:noreply,
         socket
         |> put_flash(
           :danger,
           gettext(
             "Cannot delete address because it is referenced by drives or charging processes."
           )
         )}

      {:error, reason} ->
        # 处理其他错误情况
        {:noreply,
         socket
         |> put_flash(
           :danger,
           gettext("Failed to delete address: %{reason}", reason: inspect(reason))
         )}
    end
  end
end
