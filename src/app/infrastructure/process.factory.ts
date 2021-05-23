import { Process, Note, Person } from '../domain';
import { ProcessEntity, NoteEntity, PersonEntity } from './storage/entities';

export class ProcessFactory {

    constructor(
        private process: ProcessEntity,
        private localNotes: NoteEntity[]
    ) {
        this.localNotes = localNotes || [];
    }

    build(): Process {
        const user: Person = this.user();
        const people: Person[] = this.people();
        const processNotes: Note[] = this.notes(this.process.notes, people);
        const localNotes: Note[] = this.notes(this.localNotes, people);
        const notes = processNotes.concat(localNotes);
        return Process.build(this.process.id, notes, people, user);
    }

    private user(): Person {
        const user: PersonEntity = this.process.user;
        return Person.build(user.id, user.name, user.surname, user.thumbUrl);
    }

    private notes(notes: NoteEntity[], people: Person[]): Note[] {
        return notes.map((note: NoteEntity) => this.toNote(note, people));
    }

    private people(): Person[] {
        return this.process.people.map(p => {
            return Person.build(p.id, p.name, p.surname, p.thumbUrl);
        })
    }

    private toNote(note: NoteEntity, people: Person[]): Note {
        const author: Person = people.filter(p => p.getId() === note.authorId)[0];
        const date: Date = new Date(Date.parse(note.publishingDateIso));
        return Note.build(author, date, note.text);
    }
}