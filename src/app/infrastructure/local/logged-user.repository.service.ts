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
            accept(
                {
                    id: '2',
                    name: 'Bart',
                    surname: 'Simpson',
                    thumbUrl: '/assets/thumbs/2.jpg',
                }
            );
        })
    }

}