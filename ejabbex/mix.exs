defmodule Ejabbex.Mixfile do
  use Mix.Project

  def project do
    [app: :ejabbex,
     version: "0.0.1",
     elixir: "~> 1.0",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {Ejabbex, []},
     applications: [:phoenix, :phoenix_html, :cowboy, :logger, :gettext, :elixible, :ejabberd]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Type `mix help deps` for examples and options.
  defp deps do
    [
     {:phoenix, "~> 1.1.4"},
     {:phoenix_html, "~> 2.4"},
     {:phoenix_live_reload, "~> 1.0", only: :dev},
     {:gettext, "~> 0.9"},
     {:cowboy, "~> 1.0"},
     {:elixible, git: "https://github.com/gabrielgatu/elixible"},
     {:ejabberd, "~> 16.3"},
     {:corsica, "~> 0.4"}
    ]
  end
end
