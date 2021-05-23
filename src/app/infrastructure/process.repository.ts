import { Injectable } from '@angular/core';
import { Process, Note } from '../domain';

@Injectable()
export abstract class ProcessRepository {
    abstract saveNote(note: Note): Promise<void>;
    abstract find(): Promise<Process>;
}