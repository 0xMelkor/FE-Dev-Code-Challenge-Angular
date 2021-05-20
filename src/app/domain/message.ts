export class Message {

    constructor(
        private authorId: string,
        private publishingDate: Date,
        private text: string
    ) {

    }

    getAuthorId(): string {
        return this.authorId;
    }

    getPublishingDate(): Date {
        return this.publishingDate;
    }

    getText(): string {
        return this.text;
    }
}