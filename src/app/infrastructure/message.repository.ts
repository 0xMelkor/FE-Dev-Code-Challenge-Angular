import { Note } from '../domain';

export abstract class MessageRepository {
    abstract save(message: Note): Promise<void>;
    abstract findAll(): Promise<Note[]>;
}