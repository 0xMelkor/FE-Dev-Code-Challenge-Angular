import { Process, Note } from '../domain';

export abstract class ProcessRepository {
    abstract saveNote(note: Note): Promise<void>;
    abstract find(): Promise<Process>;
}