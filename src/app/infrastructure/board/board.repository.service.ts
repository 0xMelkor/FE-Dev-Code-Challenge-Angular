import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board, Note } from '../../domain';
import { BoardEntity, NoteEntity } from './storage/entities';
import { LocalStorage } from './storage/local.storage';
import { RemoteStorage } from './storage/remote.storage';
import { BoardRepository } from './board.repository';
import { BoardFactory } from './board.factory';

@Injectable()
export class BoardRepositoryService extends BoardRepository {

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
    find(): Promise<Board> {
        return this.remoteStorage
            .find()
            .then((board: BoardEntity) => {
                const localNotes: NoteEntity[] = this.localStorage.findAll();
                return new BoardFactory(board, localNotes).build();
            })
            .catch(e => {
                console.error(e);
                throw new Error('Unable to instantiate board!')
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



