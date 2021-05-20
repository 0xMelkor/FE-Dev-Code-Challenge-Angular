import { Injectable } from '@angular/core';
import { Note, Person } from '../../domain';
import { MessageRepository } from '../message.repository';
import { MOCK_MESSAGES, MOCK_PERSONS } from './mock-data';

interface NoteEntity {
    authorId: string;
    publishingDateIso: string;
    text: string;
}

@Injectable()
export class MessageRepositoryService extends MessageRepository {

    private DB_KEY = 'messages';
    private readonly messages: Note[] = [];

    constructor() {
        super();
    }

    /**@override */
    save(message: Note): Promise<void> {
        const allNotes: Note[] = this.retrieveAllNotes();
        allNotes.push(message);
        this.persist(allNotes);
        return new Promise(accept => accept());
    }

    private persist(notes: Note[]) {
        const json = JSON.stringify(this.toStorageEntites(notes || []));
        window.localStorage.setItem(this.DB_KEY, json);
    }

    private toStorageEntites(msgs: Note[]): NoteEntity[] {
        return msgs.map((m: Note) => ({
            authorId: m.authorId(),
            publishingDateIso: m.getPublishingDate().toISOString(),
            text: m.getText()
        }));
    }

    /**@override */
    findAll(): Promise<Note[]> {
        return new Promise(accept => accept(this.retrieveAllNotes()))
    }

    private retrieveAllNotes(): Note[] {
        return this.retrieveStoredNotes().concat(MOCK_MESSAGES);
    }

    private retrieveStoredNotes(): Note[] {
        const json: string = window.localStorage.getItem(this.DB_KEY);
        const rawMessages: NoteEntity[] = JSON.parse(json) as NoteEntity[];
        const persons: Person[] = MOCK_PERSONS;

        return rawMessages.map((rawm: NoteEntity) => {
            const author: Person = persons.filter(p => p.getId() === rawm.authorId)[0];
            const publishingDate: Date = new Date(Date.parse(rawm.publishingDateIso));
            return new Note(author, publishingDate, rawm.text);
        });
    }

}