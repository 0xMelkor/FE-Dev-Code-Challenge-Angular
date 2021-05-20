import { Injectable } from '@angular/core';
import { Person } from '../../domain';
import { PersonRepository } from '../person.repository';

@Injectable()
export class PersonRepositoryService extends PersonRepository {

    private readonly persons: Person[] = [
        {
            id: '1',
            name: 'Homer',
            surname: 'Simpson',
            thumbUrl: '/assets/thumbs/1.jpg',
        },
        {
            id: '2',
            name: 'Bart',
            surname: 'Simpson',
            thumbUrl: '/assets/thumbs/2.jpg',
        },
        {
            id: '3',
            name: 'Willie',
            surname: 'Groundskeeper',
            thumbUrl: '/assets/thumbs/3.jpg',
        },
        {
            id: '4',
            name: 'Ned',
            surname: 'Flanders',
            thumbUrl: '/assets/thumbs/4.jpg',
        }
    ];

    constructor() {
        super();
    }

    findAll(): Promise<Person[]> {
        return new Promise(accept => accept(this.persons));
    }
}