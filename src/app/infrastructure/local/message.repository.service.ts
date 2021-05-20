import { Injectable } from '@angular/core';
import { Message, Person } from '../../domain';
import { MessageRepository } from '../message.repository';
import { PersonRepositoryService } from './person.repository.service';
import { MOCK_PERSONS, MOCK_MESSAGES } from './mock-data';

interface MessageEntity {
    authorId: string;
    publishingDateIso: string;
    text: string;
}

@Injectable()
export class MessageRepositoryService extends MessageRepository {

    private DB_KEY = 'messages';
    private readonly messages: Message[] = [];

    constructor() {
        super();
    }

    /**@override */
    save(message: Message): Promise<void> {
        const allMsgs: Message[] = this.retrieveAllMsgs();
        allMsgs.push(message);
        this.persist(allMsgs);
        return new Promise(accept => accept());
    }

    private persist(msgs: Message[]) {
        const json = JSON.stringify(this.toStorageEntites(msgs || []));
        window.localStorage.setItem(this.DB_KEY, json);
    }

    private toStorageEntites(msgs: Message[]): MessageEntity[] {
        return msgs.map((m: Message) => ({
            authorId: m.authorId(),
            publishingDateIso: m.getPublishingDate().toISOString(),
            text: m.getText()
        }));
    }

    /**@override */
    findAll(): Promise<Message[]> {
        return new Promise(accept => accept(this.retrieveAllMsgs()))
    }

    private retrieveAllMsgs(): Message[] {
        return this.retrieveStoredMsgs().concat(MOCK_MESSAGES);
    }

    private retrieveStoredMsgs(): Message[] {
        const json: string = window.localStorage.getItem(this.DB_KEY);
        const rawMessages: MessageEntity[] = JSON.parse(json) as MessageEntity[];
        const persons: Person[] = MOCK_PERSONS;

        return rawMessages.map((rawm: MessageEntity) => {
            const author: Person = persons.filter(p => p.getId() === rawm.authorId)[0];
            const publishingDate: Date = new Date(Date.parse(rawm.publishingDateIso));
            return new Message(author, publishingDate, rawm.text);
        });
    }

}