import { Note } from '../domain';

export class ChatBubble {

    private authorId: string;
    private authorDisplayName: string;
    private publishingDate: Date;
    private text: string;
    private fromLoggedUser: boolean;

    getAuthorId(): string {
        return this.authorId;
    }

    getAuthorDisplayName(): string {
        return this.authorDisplayName;
    }

    getPublishingDate(): Date {
        return this.publishingDate;
    }

    getText(): string {
        return this.text;
    }

    isFromLoggedUser(): boolean {
        return this.fromLoggedUser;
    }

    static from(note: Note, loggedUserId: string): ChatBubble {
        return Object.assign(new ChatBubble(), {
            authorId: note.authorId(),
            authorDisplayName: `${note.authorName()} ${note.authorSurname()}`,
            publishingDate: note.getPublishingDate(),
            text: note.getText(),
            fromLoggedUser: loggedUserId === note.authorId()
        });
    }
}