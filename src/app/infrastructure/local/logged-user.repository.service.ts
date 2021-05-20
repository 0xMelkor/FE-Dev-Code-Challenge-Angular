import { Injectable } from '@angular/core';
import { Person } from '../../domain';
import { LoggedUserRepository } from '../logged-user.repository';

@Injectable()
export class LoggedUserRepositoryService extends LoggedUserRepository {

    constructor() {
        super();
    }

    loggedUser(): Promise<Person> {
        return new Promise(accept => {
            const id = '2';
            const name = 'Bart';
            const surname = 'Simpson';
            const thumbUrl = '/assets/thumbs/2.jpg';
            const p = new Person(id, name, surname, thumbUrl);
            accept(p);
        })
    }

}