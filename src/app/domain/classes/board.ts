import { notNull } from '../validation';
import { Note } from './note';
import { Person } from './person';
import { listOf, notEmpty, ofClass, validate } from '../validation';

export class Board {

    private constructor(
        private id: string,
        private notes: Note[],
        private people: Person[],
        private user: Person
    ) {}

    @validate
    static build(
        @notEmpty id: string,
        @listOf(Note.name) notes: Note[],
        @listOf(Person.name) people: Person[],
        @ofClass(Person.name) user: Person
    ) {
        return new Board(id, notes, people, user);
    }

    @validate
    addNote(@notNull @ofClass(Note.name) note: Note) {
        this.notes.push(note);
    }

    getId(): string {
        return this.id;
    }

    getUserId(): string {
        return this.user.getId();
    }

    getNotes(): Note[] {
        return this.notes;
    }

    getPeople(): Person[] {
        return this.people;
    }

    getUser(): Person {
        return this.user;
    }


}