import { Observable } from 'rxjs';
import { ChatBubble } from './chat-bubble.model';
import { ChatMember } from './chat-member.model';

export abstract class ChatRoom {

    /**
     * Applies bootstrap logic for the chatroom
     */
    abstract connect(): Promise<void>;

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
    abstract members(): Promise<ChatMember[]>

    /**
     * A stream of messages posted to the chatroom by all its members. A new message list is posted when
     * filter is applied.
     * @returns An observable stream of Message entities
     */
    abstract messages(): Observable<ChatBubble[]>;

    /**
     * Applies a filter to the stream of messages to show only messages from selected 'people'
     * @param users The list of users to be filtered
     */
    abstract filter(people: ChatMember[]);
}