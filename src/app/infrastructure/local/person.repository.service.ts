import { Injectable } from '@angular/core';
import { Person } from '../../domain';
import { PersonRepository } from '../person.repository';

@Injectable()
export class PersonRepositoryService extends PersonRepository {

    private readonly persons: Person[] = [
        new Person('1', 'Homer', 'Simpson', '/assets/thumbs/1.jpg'),
        new Person('2', 'Bart', 'Simpson', '/assets/thumbs/2.jpg'),
        new Person('3', 'Willie', 'Groundskeeper', '/assets/thumbs/3.jpg'),
        new Person('4', 'Ned', 'Flanders', '/assets/thumbs/4.jpg')
    ];

    constructor() {
        super();
    }

    findAll(): Promise<Person[]> {
        return new Promise(accept => accept(this.persons));
    }
}