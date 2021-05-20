import { Person } from "../domain";

export abstract class PersonRepository {
    abstract findAll(): Promise<Person[]>;
}