import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConversationService, Member, Message } from '../application';

@Component({
  selector: 'app-advanced-notes',
  templateUrl: './advanced-notes.component.html'
})
export class AdvancedNotesComponent implements OnInit, OnDestroy {

  @ViewChild('scroll')
  scrollArea: ElementRef; // we need direct control over the scolling content

  messages: Message[];
  members: Member[];

  textCtrl: FormControl;
  textCtrlPlaceholder: string;

  filterIsActive: boolean;
  showOverlay: boolean;

  private subscriptions: Subscription[];

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef, // Helps us with change detection
    private conversation: ConversationService // Exposes full Use-Case logic to the component
  ) {
    this.messages = [];
    this.members = [];
    this.subscriptions = [];
    this.filterIsActive = false;
    this.textCtrl = this.fb.control(null, [Validators.required]);
    this.textCtrlPlaceholder = 'Enter note about the process';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe()); // Avoid memory leaks
  }

  ngOnInit(): void {
    this.joinConversation();
  }

  private joinConversation() {
    this.conversation.join()
      .then(() => {
        this.members = this.conversation.members();
        this.subscribeMsgChannel();
      })
      .catch(e => {
        alert(e);
      });
  }

  private subscribeMsgChannel() {
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
    const el = this.scrollArea.nativeElement;
    el.scrollTop = el.scrollHeight;
    this.cdr.detectChanges();
  }

  async onSubmit() {
    if (this.textCtrl.valid) {
      await this.conversation.postMessage(this.textCtrl.value);
      this.textCtrl.setValue(null);
    }
  }

  onScroll(evt: any) {
    // We listen scroll to toggle the shadow on top
    const scrollTop = evt.target.scrollTop;
    this.showOverlay = scrollTop > 30;
  }

  onFilterChange(members: Member[]) {
    this.conversation.filter(members);
  }

  onFilterClose() {
    this.conversation.resetFilter();
    this.filterIsActive = false;
  }
}
