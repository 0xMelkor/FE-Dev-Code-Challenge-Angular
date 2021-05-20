import { Person } from './person';

export class Message {

    constructor(
        private author: Person,
        private publishingDate: Date,
        private text: string
    ) {

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

    getAuthor(): Person {
        return this.author;
    }

    getPublishingDate(): Date {
        return this.publishingDate;
    }

    getText(): string {
        return this.text;
    }
}