import { Person } from '../../domain';

export class Member {

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

    static from(p: Person): Member {
        return Object.assign(new Member, {
            id: p.getId(),
            displayName: `${p.getName()} ${p.getSurname()}`,
            thumbUrl: p.getThumbUrl()
        });
    }
}