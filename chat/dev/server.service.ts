import {Injectable} from "angular2/core"
declare var Phoenix: any

@Injectable()
export class ServerService {

  public socket = null
  public channel = null

  constructor() {
    this.socket = new Phoenix.Socket("ws:localhost:4000/socket")
    this.socket.connect()

    this.channel = this.socket.channel("rooms:lobby", {username: "gabriel", host: "localhost", password: "pass"})

    this.channel.join()
      .receive("ok", function() { console.log("ok") })
      .receive("error", function() { console.log("error") })
      .receive("timeout", function() { console.log("timeout") })
  }

  sendMessage(to: string, message: string) {
    this.channel.push("message:new", {message: message, to: to}, 2000)
  }

  onlineUsers() {
    this.channel.push("users:online")
  }
}
