defmodule Ejabbex.ConnectedUsers do
  @name __MODULE__

  def start_link do
    Agent.start_link fn -> %{} end, name: @name
  end

  def all do
    Agent.get @name, &Map.keys/1
  end

  def sockets do
    Agent.get @name, &Map.values/1
  end

  def store(jid, socket) do
    Agent.update @name, &Map.put(&1, jid, socket)
  end

  def remove(jid) do
    Agent.update @name, &Map.delete(&1, jid)
  end

  def get(jid) do
    Agent.get @name, &Map.get(&1, jid, nil)
  end

  def exists?(jid) do
    get(jid) != nil
  end
end
