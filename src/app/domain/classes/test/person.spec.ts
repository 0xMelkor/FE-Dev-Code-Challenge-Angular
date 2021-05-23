import { Person } from '../person';

describe('[Domain > Person]', () => {

    it('Given empty id, when create Person, then get error', () => {
        const call = () => { Person.build('', 'name', 'surname', 'http://foo.it/1.png'); }
        expect(call).toThrow();
    });

    it('Given empty name, when create Person, then get error', () => {
        const call = () => { Person.build('1', '', 'surname', 'http://foo.it/1.png'); }
        expect(call).toThrow();
    });

    it('Given empty surname, when create Person, then get error', () => {
        const call = () => { Person.build('1', 'name', '', 'http://foo.it/1.png'); }
        expect(call).toThrow();
    });

    it('Given empty thumbUrl, when create Person, then get error', () => {
        const call = () => { Person.build('1', 'name', 'surname', ''); }
        expect(call).toThrow();
    });

    it('Given null properties, when create Person, then get error', () => {
        const call = () => { Person.build(null, undefined, null, null); }
        expect(call).toThrow();
    });

    it('Given valid arguments, when create Person, then get object', () => { 
        expect(Person.build('1', 'name', 'surname', 'http://foo.it/1.png')).not.toBeNull();
    });
});
