defmodule Ejabbex.PageController do
  use Ejabbex.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
