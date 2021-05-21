import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/application';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {

  @Input()
  message: Message;

}
