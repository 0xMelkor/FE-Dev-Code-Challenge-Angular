import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/application';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {

  @Input()
  message: Message;

  alignmentClass: string;

  ngOnInit(): void {
    if (this.message) {
      this.alignmentClass = this.message.isFromLoggedUser() ? 'right' : 'left';
    }
  }
}
