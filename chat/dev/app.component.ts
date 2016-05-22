import {Component, OnInit} from 'angular2/core';
import {ContactListComponent} from "./contact-list/contact-list.component"
import {ChatComponent} from "./chat/chat.component"
import {ChatSendComponent} from "./chat/chat-send.component"
import {ServerService} from "./server.service"

@Component({
    selector: 'my-app',
    template: `
        <div id="contact-list-container">
          <div class="header">
            <h3 class="title">CONTACTS</h3>
          </div>
          <div id="contact-list">
            <contact-list [contacts]="contacts" [contactSelected]="currentContact" (onContactSelected)="onContactSelected($event)">
            </contact-list>
          </div>
        </div>
        <div id="chat-container">
          <div class="header light">
            <h3 class="title">CHAT |> @{{currentContact.username}}</h3>
          </div>
          <div id="chat">
            <chat [messages]="currentMessages"></chat>
          </div>
        </div>
        <div id="chat-send">
          <chat-send (send)="onSendClicked($event)"></chat-send>
        </div>
    `,
    directives: [ContactListComponent, ChatComponent, ChatSendComponent],
    providers: [ServerService],
})

export class AppComponent implements OnInit {

  public contacts = []
  public currentMessages = []
  public currentContact = {username: "Unknown", status: "Unknown"}

  private _allMessages = []

  constructor(private _serverService: ServerService) {
    this._serverService.channel.on("users:online", (payload) => {

      this.contacts = payload.users.map((contact) => {
        return {username: contact, status: "Available"}
      })

      this.currentContact = this.contacts[0]
    })

    this._serverService.channel.on("message:new", (payload) => {
      this.addMessage(payload.from, payload.message)
    })

    this._serverService.channel.on("user:connect", (user) => {
      console.log("user connected: " + user)
    })

    this._serverService.channel.on("user:disconnect", (user) => {
      console.log("user disconnected: " + user)
    })
  }

  initContacts() {
    this._serverService.onlineUsers()
  }

  addMessage(from, message) {
    let chatName = from

    if (from == "gabriel") {
      chatName = this.currentContact.username
    }

    this._allMessages[chatName] = this._allMessages[chatName] || []
    this._allMessages[chatName].push({author: from, message: message})

    this.currentMessages = this._allMessages[chatName]
  }

  onContactSelected(contact) {
    this.currentContact = contact
    this.currentMessages = this._allMessages[contact.username] || []
  }

  onSendClicked(message) {
    let author = "gabriel" // TODO: Logged user
    let currentMessagingContact = this.currentContact.username

    this.addMessage(author, message)
    this._serverService.sendMessage(currentMessagingContact, message)
  }

  onServerEvent(payload) {
    console.log("server event!")
  }

  ngOnInit() {
    if (this._serverService.channel.state == "joining")
      setTimeout(() => this.ngOnInit(), 2000)
    else
      this.initContacts()
  }
}
