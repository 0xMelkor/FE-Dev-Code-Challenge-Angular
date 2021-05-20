import { Message } from '../domain';

export abstract class MessageRepository {
    abstract save(message: Message): Promise<void>;
    abstract findAll(): Promise<Message[]>;
}