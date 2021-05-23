import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Process, Note, Person } from '../../domain';
import { ProcessRepository } from '../../infrastructure';
import { Conversation } from './conversation';
import { Member } from './member.model';
import { Message } from './message.model';

/**
 * This is the actual implementation of the Conversation abstraction.
 */
@Injectable()
export class ConversationService extends Conversation {

    private process: Process;
    private messages$: BehaviorSubject<Message[]>;
    private mermberIdsFilter: string[];

    constructor(
        private repository: ProcessRepository
    ) {
        super();
        this.mermberIdsFilter = [];
    }

    /** @override */
    async join(): Promise<void> {
        this.process = await this.repository.find();
        const notes: Note[] = this.process.getNotes();
        const msgs = notes.map((n: Note) => this.toMessage(n));
        this.messages$ = new BehaviorSubject(msgs);
        this.mermberIdsFilter = this.process.getPeople().map((p: Person) => p.getId());
    }

    /** @override */
    members(): Member[] {
        const people: Person[] = this.process.getPeople();
        return people.map((p: Person) => Member.from(p));
    }

    /** @override */
    filter(people: Member[]) {
        people = people || [];
        this.mermberIdsFilter = people.map((cm: Member) => cm.getId());
        this.notifyMessagesUpdate();
    }

    /** @override */
    resetFilter() {
        const allPeople = this.process.getPeople();
        this.mermberIdsFilter = allPeople.map((p: Person) => p.getId());
        this.notifyMessagesUpdate();
    }

    /** @override */
    async postMessage(text: string): Promise<void> {
        const publishingDate = new Date();
        const author: Person = this.process.getUser();
        const note = Note.build(author, publishingDate, text);

        await this.repository.saveNote(note);
        this.process.addNote(note);

        this.notifyMessagesUpdate();
    }

    /** @override */
    messages(): Observable<Message[]> {
        return this.messages$
            .asObservable()
            .pipe(
                map((msgs: Message[]) => this.filterByMember(msgs)),
                map((msgs: Message[]) => this.sortByDateDesc(msgs))
            );
    }

    private filterByMember(msgs: Message[]): Message[] {
        msgs = msgs || [];
        return msgs.filter((b: Message) => {
            const authorId: string = b.getAuthorId();
            const memberInFilter = this.mermberIdsFilter.indexOf(authorId) !== -1;
            return memberInFilter;
        })
    }

    private sortByDateDesc(msgs: Message[]): Message[] {
        return msgs.sort((m1: Message, m2: Message) => {
            return +m1.getPublishingDate() - +m2.getPublishingDate();
        });
    }

    private async notifyMessagesUpdate() {
        const notes: Note[] = this.process.getNotes();
        const msgs = notes.map((m: Note) => this.toMessage(m));
        this.messages$.next(msgs);
    }

    private toMessage(m: Note): Message {
        return Message.from(m, this.process.getUser().getId());
    }
}