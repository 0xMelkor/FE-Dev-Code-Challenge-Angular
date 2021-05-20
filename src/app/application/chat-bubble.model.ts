import { Message } from '../domain';

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

    static from(msg: Message, loggedUsrId: string): ChatBubble {
        return Object.assign(new ChatBubble(), {
            authorId: msg.authorId(),
            authorDisplayName: `${msg.authorName()} ${msg.authorSurname()}`,
            publishingDate: msg.getPublishingDate(),
            text: msg.getText(),
            fromLoggedUser: loggedUsrId === msg.authorId()
        });
    }
}