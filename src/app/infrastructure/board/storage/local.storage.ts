import {NoteEntity} from './entities';

export class LocalStorage {

    private NOTES_RECORD = 'notes';

    findAll(): NoteEntity[] {
        const json: string = window.localStorage.getItem(this.NOTES_RECORD);
        const entities: NoteEntity[] = JSON.parse(json) || [];
        return entities;
    }

    persist(note: NoteEntity) {
        const json: string = JSON.stringify(note);
        window.localStorage.setItem(this.NOTES_RECORD, json);
    }
}