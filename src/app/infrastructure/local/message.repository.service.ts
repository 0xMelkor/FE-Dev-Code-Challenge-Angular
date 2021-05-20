import { Injectable } from '@angular/core';
import { Message } from '../../domain';
import { MessageRepository } from '../message.repository';

@Injectable()
export class MessageRepositoryService extends MessageRepository {

    private DB_KEY = 'messages';
    private readonly messages: Message[] = [];

    constructor() {
        super();
    }

    save(message: Message): Promise<void> {
        const storedMsgs: Message[] = this.storedMessages();
        storedMsgs.push(message);
        window.localStorage.setItem(this.DB_KEY, JSON.stringify(storedMsgs));
        return new Promise(accept => accept());
    }

    findAll(): Promise<Message[]> {
    
        /*const msgs: Message[] = this.messages
            .concat(this.storedMessages())
            .sort((m1: Message, m2: Message) => {
                const d1Time: number = Date.parse(m1.publishingDate);
                const d2Time: number = Date.parse(m2.publishingDate);
                return d1Time - d2Time
            });*/
        
        return new Promise(accept => accept([]))
    }


    private storedMessages(): Message[] {
        const rawMessages: string = window.localStorage.getItem(this.DB_KEY);
        return JSON.parse(rawMessages) as Message[];
    }

}