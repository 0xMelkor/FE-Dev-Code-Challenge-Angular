import { Board, Note } from '../../domain';

export abstract class BoardRepository {
    abstract saveNote(note: Note): Promise<void>;
    abstract find(): Promise<Board>;
}