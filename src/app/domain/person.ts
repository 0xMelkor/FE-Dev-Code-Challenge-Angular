
export class Person {

    constructor(
        private id: string,
        private name: string,
        private surname: string,
        private thumbUrl: string
    ) { }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getSurname(): string {
        return this.surname;
    }

    getThumbUrl(): string {
        return this.thumbUrl;
    }

}