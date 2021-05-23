import { Person } from '../person';
import { Note } from '../note';
import { Process } from '../process';

describe('[Domain > Note]', () => {

    const user: Person = Person.build('1', 'name1', 'surname1', 'http://foo.it/1.png');

    it('Given empty id, when create Process, then get error', () => {
        const call = () => { Process.build('', [], [], user); }
        expect(call).toThrow();
    });

    it('Given null notes, when create Process, then get error', () => {
        const call = () => { Process.build('id', null, [], user); }
        expect(call).toThrow();
    });

    it('Given null people, when create Process, then get error', () => {
        const call = () => { Process.build('id', [], null, user); }
        expect(call).toThrow();
    });

    it('Given null user, when create Process, then get error', () => {
        const call = () => { Process.build('id', [], [], null); }
        expect(call).toThrow();
    });

    it('Given valid arguments, when create Process, then get object', () => {
        const p1: Person = Person.build('2', 'name2', 'surname3', 'http://foo.it/2.png');
        const p2: Person = Person.build('3', 'name3', 'surname3', 'http://foo.it/3.png');
        const note: Note = Note.build(p1, new Date(), 'text');
        expect(Process.build('id', [note], [user, p1, p2], user)).not.toBeNull();
    });
});
