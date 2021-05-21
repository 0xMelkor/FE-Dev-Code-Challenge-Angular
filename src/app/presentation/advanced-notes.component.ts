import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Conversation, Member, Message } from '../application';

@Component({
  selector: 'app-advanced-notes',
  templateUrl: './advanced-notes.component.html'
})
export class AdvancedNotesComponent implements OnInit, OnDestroy {

  messages: Message[];
  members: Member[];

  private subscriptions: Subscription[];

  constructor(private conversation: Conversation) {
    this.messages = [];
    this.members = [];
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.conversation
      .join()
      .then(() => {
        this.members = this.conversation.members();
        this.listenMessages();
      })
      .catch(e => {
        alert(e);
      })
  }

  private listenMessages() {
    this.subscriptions.push(
      this.conversation
        .messages()
        .subscribe((msgs: Message[]) => {
          this.messages = msgs;
        })
    );
  }

}
