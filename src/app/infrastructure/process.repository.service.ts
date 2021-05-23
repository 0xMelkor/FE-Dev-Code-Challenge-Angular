import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Process, Note } from '../domain';
import { ProcessEntity, NoteEntity } from './storage/entities';
import { LocalStorage } from './storage/local.storage';
import { RemoteStorage } from './storage/remote.storage';
import { ProcessRepository } from './process.repository';
import { ProcessFactory } from './process.factory';

@Injectable()
export class ProcessRepositoryService extends ProcessRepository {

    private localStorage: LocalStorage;
    private remoteStorage: RemoteStorage;

    constructor(http: HttpClient) {
        super();
        this.localStorage = new LocalStorage();
        this.remoteStorage = new RemoteStorage(http);
    }

    /**@override */
    saveNote(note: Note): Promise<void> {
        const entity: NoteEntity = this.toEntity(note);
        this.localStorage.persist(entity);
        return new Promise(accept => accept());
    }

    /**@override */
    find(): Promise<Process> {
        return this.remoteStorage
            .find()
            .then((process: ProcessEntity) => {
                const localNotes: NoteEntity[] = this.localStorage.findAll();
                return new ProcessFactory(process, localNotes).build();
            })
            .catch(e => {
                console.error(e);
                throw new Error('Unable to instantiate process!')
            });
    }

    private toEntity(n: Note): NoteEntity {
        return {
            authorId: n.authorId(),
            publishingDateIso: n.getPublishingDate().toISOString(),
            text: n.getText()
        };
    }
}



