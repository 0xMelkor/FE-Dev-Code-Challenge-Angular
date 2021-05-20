import { Person } from '../domain';

export class ChatMember {

    private id: string;
    private displayName: string;
    private thumbUrl: string;

    getId(): string {
        return this.id;
    }

    getDisplayName(): string {
        return this.displayName;
    }

    getThumbUrl(): string {
        return this.thumbUrl;
    }

    static from(p: Person): ChatMember {
        return Object.assign(new ChatMember, {
            id: p.getId(),
            displayName: `${p.getName()} ${p.getSurname()}`,
            thumbUrl: p.getThumbUrl()
        });
    }
}