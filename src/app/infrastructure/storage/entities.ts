export interface ProcessEntity {
    id: string;
    user: PersonEntity;
    people: PersonEntity[];
    notes: NoteEntity[]
}

export interface NoteEntity {
    authorId: string;
    publishingDateIso: string;
    text: string;
}

export interface PersonEntity {
    id: string,
    name: string,
    surname: string,
    thumbUrl: string
}