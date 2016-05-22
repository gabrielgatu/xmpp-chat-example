defmodule Ejabbex.XMPPClient do
  use Elixible.Client
  import Phoenix.Channel, only: [push: 3, broadcast: 3]

  alias XmppMapper.Stanza.{Message, DiscoItems, JID}

  def handle_iq(iq) do
    case iq.sub_els do
      [%DiscoItems{items: items} | _] ->
        handle_iq_users_online(iq.to, items)
      _ ->
        nil
    end
  end

  def handle_chatstate(chatstate) do
    IO.inspect chatstate
  end

  def handle_presence(presence) do
    IO.inspect presence
  end

  def handle_message(%Message{body: [{:text, _, message}], from: from, to: to}) do
    socket = Ejabbex.ConnectedUsers.get(JID.to_string(to))
    push(socket, "message:new", %{message: message, from: from.user})
  end

  def handle_message(message) do
    IO.inspect message
  end

  # Private API

  defp handle_iq_users_online(from, items) do
    jid = JID.to_string(from)

    users =
      items
      |> get_users
      |> remove_current_user(jid)

    users = %{users: users}
    socket = Ejabbex.ConnectedUsers.get(jid)
    push(socket, "users:online", users)
  end

  defp get_users(items) do
    Enum.map(items, &Map.get(&1.jid, :user))
  end

  defp remove_current_user(users, jid) do
    user = JID.from_string(jid) |> Map.get(:user)
    List.delete(users, user)
  end
end
