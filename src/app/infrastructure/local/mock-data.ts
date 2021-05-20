import { Note, Person } from '../../domain';

export const MOCK_PERSONS: Person[] = [
    new Person('1', 'Homer', 'Simpson', '/assets/thumbs/1.jpg'),
    new Person('2', 'Bart', 'Simpson', '/assets/thumbs/2.jpg'),
    new Person('3', 'Willie', 'Groundskeeper', '/assets/thumbs/3.jpg'),
    new Person('4', 'Ned', 'Flanders', '/assets/thumbs/4.jpg')
];

export const MOCK_MESSAGES: Note[] = [
    new Note(MOCK_PERSONS[0], new Date(Date.parse('2021-05-20T10:24:17.250Z')), 'Wow, sono nato lo stesso giorno del mio compleanno! Mitico!!!'),
    new Note(MOCK_PERSONS[1], new Date(Date.parse('2021-05-20T10:24:18.250Z')), 'Wow, sono nato lo stesso giorno del mio compleanno! Mitico!!!'),
    new Note(MOCK_PERSONS[2], new Date(Date.parse('2021-05-20T10:24:19.250Z')), 'Wow, sono nato lo stesso giorno del mio compleanno! Mitico!!!'),
    new Note(MOCK_PERSONS[0], new Date(Date.parse('2021-05-20T10:24:20.250Z')), 'Wow, sono nato lo stesso giorno del mio compleanno! Mitico!!!'),
    new Note(MOCK_PERSONS[0], new Date(Date.parse('2021-05-20T10:24:21.250Z')), 'Wow, sono nato lo stesso giorno del mio compleanno! Mitico!!!'),
    new Note(MOCK_PERSONS[0], new Date(Date.parse('2021-05-20T10:24:22.250Z')), 'Wow, sono nato lo stesso giorno del mio compleanno! Mitico!!!'),
    new Note(MOCK_PERSONS[0], new Date(Date.parse('2021-05-20T10:24:23.250Z')), 'Wow, sono nato lo stesso giorno del mio compleanno! Mitico!!!'),
    new Note(MOCK_PERSONS[0], new Date(Date.parse('2021-05-20T10:24:24.250Z')), 'Wow, sono nato lo stesso giorno del mio compleanno! Mitico!!!'),
    new Note(MOCK_PERSONS[0], new Date(Date.parse('2021-05-20T10:24:25.250Z')), 'Wow, sono nato lo stesso giorno del mio compleanno! Mitico!!!'),
    new Note(MOCK_PERSONS[0], new Date(Date.parse('2021-05-20T10:24:26.250Z')), 'Wow, sono nato lo stesso giorno del mio compleanno! Mitico!!!'),
]; 