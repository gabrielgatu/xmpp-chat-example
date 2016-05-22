import {Component, Input} from "angular2/core"

@Component({
  selector: "chat",
  template: `
    <div class="chat-container">
      <div *ngFor="#message of messages; #i = index" class="message" [class.right]="isPersonalMessage(message)" [class.left]="!isPersonalMessage(message)">
        <div class="wrapper">
          <span class="text">{{message.message}}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["../../src/css/chat.css"],
})

export class ChatComponent {
  @Input("messages") public messages = []

  isPersonalMessage(message) {
    return message.author == "gabriel" // TODO: Logged user
  }
}
