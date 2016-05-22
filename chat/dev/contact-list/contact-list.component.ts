import {Component, Input, Output, EventEmitter} from "angular2/core"

@Component({
  selector: "contact-list",
  template: `
    <div *ngFor="#contact of contacts" (click)="handleClick(contact)" [class.selected]="contact == currentContact" class="contact">
      <div class="avatar"></div>
      <span class="username">{{contact.username}}</span>
      <span class="status">{{contact.status}}</span>
    </div>
  `,
  styleUrls: ["../../src/css/contact-list.css"],
})

export class ContactListComponent {
  @Input("contacts") contacts = []
  @Input("contactSelected") currentContact = {}
  @Output() onContactSelected: EventEmitter<any> = new EventEmitter()

  handleClick(contact) {
    this.currentContact = contact
    this.onContactSelected.emit(contact)
  }
}
