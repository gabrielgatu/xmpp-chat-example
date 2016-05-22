# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :ejabbex, Ejabbex.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "KHcK7eTkSHs7sqVTQtRzhkqEsSXvdA8yfrpVOuDj3wW6X3BujF5/TgfEA3BAedG4",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: Ejabbex.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Config ejabberd
config :ejabberd,
  file: "config/ejabberd.yml",
  log_path: "logs/ejabberd.log"

# Customize Mnesia directory:
config :mnesia,
  dir: "mnesiadb/"

config :elixible,
  client: Ejabbex.XMPPClient

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
