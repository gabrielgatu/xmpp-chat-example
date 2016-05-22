defmodule Ejabbex.RoomChannel do
  use Ejabbex.Web, :channel

  def join("rooms:lobby", %{"username" => username, "host" => host, "password" => pass}, socket) do
    jid = "#{username}@#{host}"

    Ejabbex.XMPPClient.login(jid, pass)

    send(self, :after_join)
    {:ok, assign(socket, :jid, jid)}
  end

  def terminate(_reason, socket) do
    jid = socket.assigns.jid
    Ejabbex.ConnectedUsers.remove(jid)
  end

  @doc """
  Requests the online users. Returns directly the result.
  """
  def handle_in("users:online", _payload, socket) do
    Ejabbex.XMPPClient.online_users(socket.assigns.jid)
    {:noreply, socket}
  end

  @doc """
  Sends a message to a user
  """
  def handle_in("message:new", %{"message" => message, "to" => to}, socket) do
    from_jid = socket.assigns.jid
    Ejabbex.XMPPClient.send_message(from_jid, "#{to}@localhost", message)

    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    # broadcast_from(socket, "user:connect", %{name: username})
    jid = socket.assigns.jid

    Ejabbex.ConnectedUsers.store(jid, socket)
    Ejabbex.XMPPClient.send_presence(jid, "Ready to Go!")
    {:noreply, socket}
  end
end
