import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Conversation, Member, Message } from '../application';

@Component({
  selector: 'app-advanced-notes',
  templateUrl: './advanced-notes.component.html'
})
export class AdvancedNotesComponent implements OnInit, OnDestroy {

  messages: Message[];
  members: Member[];
  textCtrl: FormControl;
  placeholderText: string;

  private subscriptions: Subscription[];

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private conversation: Conversation
    ) {
    this.placeholderText = 'Enter note about the process';
    this.messages = [];
    this.members = [];
    this.subscriptions = [];
    this.textCtrl = this.fb.control(null, [Validators.required]);
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
          this.scrollBottom();
        })
    );
  }

  private scrollBottom() {
    this.cdr.detectChanges();
  }

  async onSubmit() {
    if(this.textCtrl.valid) {
      await this.conversation.postMessage(this.textCtrl.value);
      this.textCtrl.setValue(null);
    }
  }

}
