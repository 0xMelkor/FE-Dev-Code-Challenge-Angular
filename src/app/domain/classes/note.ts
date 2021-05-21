import { Person } from './person';
import { notEmpty, notNull, ofClass, validate } from '../validation';

export class Note {

    private constructor(
        private author: Person,
        private publishingDate: Date,
        private text: string
    ) { }

    @validate
    static build(
        @notNull @ofClass(Person.name) author,
        @notNull @ofClass(Date.name) publishingDate,
        @notEmpty text: string
    ): Note {
        return new Note(author, publishingDate, text);
    }

    authorId(): string {
        return this.author.getId();
    }

    authorName(): string {
        return this.author.getName();
    }

    authorSurname(): string {
        return this.author.getSurname();
    }

    authorThumbUrl(): string {
        return this.author.getThumbUrl();
    }

    getPublishingDate(): Date {
        return this.publishingDate;
    }

    getText(): string {
        return this.text;
    }
}