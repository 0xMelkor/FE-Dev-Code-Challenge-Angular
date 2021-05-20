import { Person } from "./person.model";

export class Message {

    constructor(
        private id: string,
        private author: Person,
        private publishingDate: Date,
        private text: string,
    ) {

    }

    getId(): string {
        return this.id;
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