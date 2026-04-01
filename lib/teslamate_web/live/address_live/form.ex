defmodule TeslaMateWeb.AddressLive.Form do
  use TeslaMateWeb, :live_view

  alias TeslaMate.Locations
  alias TeslaMate.Locations.Address

  on_mount {TeslaMateWeb.InitAssigns, :locale}

  @impl true
  def mount(%{"id" => id}, %{"settings" => _settings}, socket) do
    address = Locations.get_address!(id)
    {:ok, base_assigns(socket, address, :edit)}
  end

  def mount(params, %{"settings" => _settings}, socket) do
    address = %Address{
      latitude: Decimal.new(params["lat"] || "0.0"),
      longitude: Decimal.new(params["lng"] || "0.0")
    }
    {:ok, base_assigns(socket, address, :new)}
  end

  defp base_assigns(socket, %Address{} = address, action) when action in [:new, :edit] do
    {:ok, addresses} = Locations.search_address(address)
    assigns = %{
      page_title: if(action == :new, do: gettext("New Address"), else: gettext("Edit Address")),
      address: address,
      changeset: Locations.change_address(address),
      action: action,
      redirect_to: ~p"/address",
      show_errors: false,
      type: "",
      addresses: addresses
    }

    assign(socket, assigns)
  end

  @impl true
  def handle_params(_params, _url, socket) do
    {:noreply, socket}
  end

  @impl true
  def handle_event("validate", %{"address" => address_params}, socket) do
    changeset =
      socket.assigns.address
      |> Locations.change_address(address_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"address" => address_params}, socket) do
    save_address(socket, socket.assigns.action, address_params)
  end

  def handle_event("change_address", address_data, socket) do
    changeset =
      socket.assigns.address
      |> Locations.change_address(address_data)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  defp save_address(socket, :edit, address_params) do
    case Locations.update_address(socket.assigns.address, address_params) do
      {:ok, _address} ->
        {:noreply,
         socket
         |> put_flash(:info, gettext("Address updated successfully"))
         |> push_navigate(to: socket.assigns.redirect_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset, show_errors: true)}
    end
  end

  defp save_address(socket, :new, address_params) do
    case Locations.create_address(address_params) do
      {:ok, _address} ->
        {:noreply,
         socket
         |> put_flash(:info, gettext("Address created successfully"))
         |> push_navigate(to: socket.assigns.redirect_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset, show_errors: true)}
    end
  end
end
