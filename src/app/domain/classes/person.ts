import { notEmpty, validate } from "../validation";

export class Person {

    private constructor(
        private id: string,
        private name: string,
        private surname: string,
        private thumbUrl: string
    ) { }

    @validate
    static build(
        @notEmpty id: string,
        @notEmpty name: string,
        @notEmpty surname: string,
        @notEmpty thumbUrl: string
    ): Person {
        return new Person(id, name, surname, thumbUrl);
    }

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