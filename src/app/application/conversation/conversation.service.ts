import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Board, Note, Person } from '../../domain';
import { BoardRepository } from '../../infrastructure';
import { Conversation } from './conversation';
import { Member } from './member.model';
import { Message } from './message.model';

@Injectable()
export class ConversationService extends Conversation {

    private board: Board;
    private messages$: BehaviorSubject<Message[]>;
    private mermberIdsFilter: string[];

    constructor(
        private repository: BoardRepository
    ) {
        super();
        this.mermberIdsFilter = [];
    }

    /** @override */
    async join(): Promise<void> {
        this.board = await this.repository.find();
        const notes: Note[] = this.board.getNotes();
        const msgs = notes.map((n: Note) => this.toMessage(n));
        this.messages$ = new BehaviorSubject(msgs);
        this.mermberIdsFilter = this.board.getPeople().map((p: Person) => p.getId());
    }

    /** @override */
    members(): Member[] {
        const people: Person[] = this.board.getPeople();
        return people.map((p: Person) => Member.from(p));
    }

    /** @override */
    filter(people: Member[]) {
        people = people || [];
        this.mermberIdsFilter = people.map((cm: Member) => cm.getId());
        this.notifyMessagesUpdate();
    }

    /** @override */
    async postMessage(text: string): Promise<void> {
        const publishingDate = new Date();
        const author: Person = this.board.getUser();
        const note = Note.build(author, publishingDate, text);

        await this.repository.saveNote(note);
        this.board.addNote(note);

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
            const isLoggedUser = authorId === this.board.getUserId();
            const memberInFilter = this.mermberIdsFilter.indexOf(authorId) !== -1;
            return isLoggedUser || memberInFilter;
        })
    }

    private sortByDateDesc(msgs: Message[]): Message[] {
       return msgs.sort((m1: Message, m2: Message) => {
                return +m1.getPublishingDate() - +m2.getPublishingDate();
            });
    }

    private async notifyMessagesUpdate() {
        const notes: Note[] = this.board.getNotes();
        const msgs = notes.map((m: Note) => this.toMessage(m));
        this.messages$.next(msgs);
    }

    private toMessage(m: Note): Message {
        return Message.from(m, this.board.getUser().getId());
    }
}