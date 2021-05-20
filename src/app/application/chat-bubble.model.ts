import { Message, Person } from "../domain";

export class ChatBubble {

    authorId: string;
    authorDisplayName: string;
    publishingDate: Date;
    text: string;
    fromLoggedUser: boolean;

    static from(msg: Message, author: Person, loggedUsrId: string): ChatBubble {
        return Object.assign(new ChatBubble(), {
            authorId: msg.authorId,
            authorDisplayName: `${author.name} ${author.surname}`,
            publishingDate: new Date(Date.parse(msg.publishingDate)),
            text: msg.text,
            fromLoggedUser: loggedUsrId === author.id
        });
    }
}