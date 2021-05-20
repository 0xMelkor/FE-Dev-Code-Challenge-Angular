import { Message } from "../domain";

export abstract class MessageRepository {
    abstract save(message: Message): Promise<void>;
    abstract findAllSortByDateDesc(): Promise<Message[]>;
}