var ejabbex = {};

ejabbex.openSocketConnection = function(username, host, password, cb) {
  var socket = new Phoenix.Socket("/socket")
  socket.connect()

  var channel = socket.channel("rooms:lobby", {username: username, host: host, password: password})

  channel.on("message:new", function(payload) {
    var personal = ejabbex.connection.username == payload.from // Boolean

    addMessageToChat(payload.from, payload.message, personal)
    console.log("received message", payload)
  })

  channel.on("user:connect", function(user) {
    addUserToList(user.name)
  })

  channel.on("user:disconnect", function(user) {
    removeUserFromList(user.name)
  })

  channel.join()
  .receive("ok", function() { cb("ok") })
  .receive("error", function() { cb("error") })
  .receive("timeout", function() { cb("timeout") })

  ejabbex.connection = {
    username: username,
    socket: socket,
    channel: channel
  };
}

ejabbex.onlineUsers = function() {
  ejabbex.connection.channel.push("user:online")
    .receive("ok", function(payload) { addUsersToList(payload.users) })
    .receive("error", function() { console.log("received error") })
    .receive("timeout", function() { console.log("received timeout") })
}

ejabbex.sendMessage = function(message) {
  ejabbex.connection.channel.push("message:new", {message: message}, 2000)
}

window.ejabbex = ejabbex;
