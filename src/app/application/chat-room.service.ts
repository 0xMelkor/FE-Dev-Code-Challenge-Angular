import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/internal/operators';
import { Message, Person } from '../domain';
import { LoggedUserRepository, MessageRepository, PersonRepository } from '../infrastructure';
import { ChatBubble } from './chat-bubble.model';
import { ChatMember } from './chat-member.model';
import { ChatRoom } from './chat-room';

@Injectable()
export class ChatRoomService extends ChatRoom {

    private user: Person;
    private messages$: BehaviorSubject<ChatBubble[]>;
    private mermberIdsFilter: string[];

    constructor(
        private messageRepo: MessageRepository,
        private personRepo: PersonRepository,
        private userRepo: LoggedUserRepository
    ) {
        super();
    }

    /** @override */
    async connect(): Promise<void> {
        this.user = await this.userRepo.loggedUser();
        const messages: Message[] = await this.messageRepo.findAll();
        const chatBubbles = messages.map((m: Message) => this.toBubble(m));
        this.messages$ = new BehaviorSubject(chatBubbles);
    }

    /** @override */
    members(): Promise<ChatMember[]> {
        return this.personRepo
            .findAll()
            .then((persons: Person[]) => {
                return persons.map((p: Person) => ChatMember.from(p));
            });
    }

    /** @override */
    async filter(people: ChatMember[]) {
        people = people || [];
        this.mermberIdsFilter = people.map((cm: ChatMember) => cm.getId());
        this.messages$.next(await this.allBubbles());
    }

    /** @override */
    async postMessage(text: string): Promise<void> {
        const publishingDate = new Date();
        const author: Person = this.user;
        const msg = new Message(author, publishingDate, text);
        await this.messageRepo.save(msg);
        const bubbles: ChatBubble[] = await this.allBubbles();
        bubbles.push(this.toBubble(msg));
        this.messages$.next(bubbles);
    }

    /** @override */
    messages(): Observable<ChatBubble[]> {
        return this.messages$
            .asObservable()
            .pipe(
                map((bubbles: ChatBubble[]) => this.filterBubbles(bubbles))
            );
    }

    private filterBubbles(bubbles: ChatBubble[]): ChatBubble[] {
        bubbles = bubbles || [];
        return bubbles.filter((b: ChatBubble) => {
            const authorId: string = b.getAuthorId();
            const isLoggedUser = authorId === this.user.getId();
            const memberNotInFilter = this.mermberIdsFilter.indexOf(authorId) === -1;
            return isLoggedUser || memberNotInFilter;
        })
    }

    private allBubbles(): Promise<ChatBubble[]> {
        return this.messages$.pipe(take(1)).toPromise();
    }

    private toBubble(m: Message): ChatBubble {
        return ChatBubble.from(m, this.user.getId());
    }
}