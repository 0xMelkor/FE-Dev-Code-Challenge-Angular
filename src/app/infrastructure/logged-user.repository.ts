import { Person } from "../domain";

export abstract class LoggedUserRepository {
    abstract loggedUser(): Promise<Person>;
}