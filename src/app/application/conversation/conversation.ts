import { Observable } from 'rxjs';
import { Message } from './message.model';
import { Member } from './member.model';

export abstract class Conversation {

    /**
     * Applies bootstrap logic for the Conversation
     */
    abstract join(): Promise<void>;

    /**
     * Posts a message to the chatroom on behalf of the connected user.
     * @param text The text to be posted
     * @returns A promise that resolves once the message has been stored in the persistence layer
     */
    abstract postMessage(text: string): Promise<void>;

    /**
     * Gets all the members in the chatroom, comprised the logged user.
     * @returns A promise that contains a reference to all users belonging to the chatroom
     */
    abstract members(): Member[]

    /**
     * A stream of messages posted to the chatroom by all its members. A new message list is posted when
     * filter is applied.
     * @returns An observable stream of ChatBubble entities
     */
    abstract messages(): Observable<Message[]>;

    /**
     * Applies a filter to the stream of messages to show only messages from selected 'people'
     * @param users The list of users to be filtered
     */
    abstract filter(people: Member[]);
}