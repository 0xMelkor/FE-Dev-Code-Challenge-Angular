import { Person } from '../person';
import { Note } from '../note';

describe('[Domain > Note]', () => {

    const author: Person = Person.build('1', 'name', 'surname', 'http://foo.it/1.png');

    it('Given null author, when create Note, then get error', () => {
        const call = () => { Note.build(null, new Date(), 'text'); }
        expect(call).toThrow();
    });

    it('Given null publishingDate, when create Note, then get error', () => {
        const call = () => { Note.build(author, null, 'text'); }
        expect(call).toThrow();
    });

    it('Given empty text, when create Note, then get error', () => {
        const call = () => { Note.build(author, new Date(), ''); }
        expect(call).toThrow();
    });

    it('Given valid arguments, when create Note, then get object', () => {
        expect(Note.build(author, new Date(), 'text')).not.toBeNull();
    });
});