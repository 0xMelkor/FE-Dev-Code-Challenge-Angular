import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../domain';
import { LoggedUserRepository, MessageRepository, PersonRepository } from '../infrastructure';
import { ChatBubble } from './chat-bubble.model';
import { ChatMember } from './chat-member.model';
import { ChatRoom } from './chat-room';

@Injectable()
export class ChatRoomService extends ChatRoom {

    private loggedMember: ChatMember;
    private roomMembers: ChatMember[];
    private bubbles: ChatBubble[];

    constructor(
        private messageRepo: MessageRepository,
        private personRepo: PersonRepository,
        private loggedUserRepo: LoggedUserRepository
    ) {
        super();
        this.bubbles = [];
        this.roomMembers = [];
    }

    async members(): Promise<ChatMember[]> {
        const persons: Person[] = await this.personRepo.findAll();
        return persons.map(p => ChatMember.from(p));
    }

    messages(): Observable<ChatBubble[]> {
        throw new Error('Method not implemented.');
    }

    filter(people: ChatMember[]) {
        throw new Error('Method not implemented.');
    }

    async postMessage(text: string): Promise<void> {

        const [loggedMember, chatMembers]: [ChatMember, ChatMember[]] = Promise.all([
            this.getLoggedUser(),
            this.getChatMembers()
        ]);

        const msg: Message =

        throw new Error('Method not implemented.');
    }

    private async getLoggedUser(): Promise<ChatMember> {
        return this.loggedMember || await this.loggedUserRepo
            .loggedUser()
            .then((usr: Person) => {
                this.loggedMember = ChatMember.from(usr);
                return this.loggedMember;
            });
    }

    private async getChatMembers(): Promise<ChatMember[]> {
        return !!this.roomMembers ? this.roomMembers : await this.personRepo
            .findAll()
            .then((persons: Person[]) => {
                this.roomMembers = persons.map(p => ChatMember.from(p));
                return this.roomMembers;
            });
    }
}