import { Board, Note, Person } from '../../domain';
import { BoardEntity, NoteEntity, PersonEntity } from './storage/entities';

export class BoardFactory {

    constructor(
        private board: BoardEntity,
        private localNotes: NoteEntity[]
    ) {
        this.localNotes = localNotes || [];
    }

    build(): Board {
        const user: Person = this.user();
        const people: Person[] = this.people();
        const boardNotes: Note[] = this.notes(this.board.notes, people);
        const localNotes: Note[] = this.notes(this.localNotes, people);
        const notes = boardNotes.concat(localNotes);
        return Board.build(this.board.id, notes, people, user);
    }

    private user(): Person {
        const user: PersonEntity = this.board.user;
        return Person.build(user.id, user.name, user.surname, user.thumbUrl);
    }

    private notes(notes: NoteEntity[], people: Person[]): Note[] {
        return notes.map((note: NoteEntity) => this.toNote(note, people));
    }

    private people(): Person[] {
        return this.board.people.map(p => {
            return Person.build(p.id, p.name, p.surname, p.thumbUrl);
        })
    }

    private toNote(note: NoteEntity, people: Person[]): Note {
        const author: Person = people.filter(p => p.getId() === note.authorId)[0];
        const date: Date = new Date(Date.parse(note.publishingDateIso));
        return Note.build(author, date, note.text);
    }
}