import {Component, Output, EventEmitter} from "angular2/core"

@Component({
  selector: "chat-send",
  template: `
    <div class="chat-send">
      <input [(ngModel)]="message" class="field" type="text" placeholder="Message..." />
      <button (click)="handleSendClick()" class="button">SEND</button>
    </div>
  `,
  styleUrls: ["../../src/css/chat-send.css"],
})

export class ChatSendComponent {
  @Output("send") sendEvent: EventEmitter<any> = new EventEmitter()

  public message: string = ""

  handleSendClick() {
    this.sendEvent.emit(this.message)
    this.message = ""
  }
}
