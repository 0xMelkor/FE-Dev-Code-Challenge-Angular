import { Person } from "../domain";

export class ChatMember {

    id: string;
    displayName: string;
    thumbUrl: string;

    static from(p: Person): ChatMember {
        return Object.assign(new ChatMember, {
            id: p.id,
            displayName: `${p.name} ${p.surname}`,
            thumbUrl: p.thumbUrl
        });
    }
}