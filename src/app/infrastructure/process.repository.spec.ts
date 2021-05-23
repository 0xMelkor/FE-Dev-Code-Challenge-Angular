import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Process } from '../domain';
import { ProcessRepositoryService } from './process.repository.service';


describe('Infrastructure > Process Repository', () => {

    let repository: ProcessRepositoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProcessRepositoryService,
                {
                    provide: HttpClient,
                    useClass: MockHttpClient
                }
            ]
        }).compileComponents();

        repository = TestBed.inject(ProcessRepositoryService);
    });

    it('Given invalid remote response, when find Process, then get error', async () => {
        try {
            MockHttpClient.onRequestReturn(invalidResponse);
            await repository.find();
            expect(false).toBeTrue(); // Force test to fail!
        } catch (e) {
            expect(true).toBeTrue(); // We got error, so it works!
        }
    });

    it('Given valid remote response, when find Process, then get object', async () => {
        MockHttpClient.onRequestReturn(validResponse);
        const process: Process = await repository.find();
        expect(process).not.toBeNull();
    });

});

class MockHttpClient {
    private static response: any;

    static onRequestReturn(response: any) {
        MockHttpClient.response = response;
    }

    get(): Observable<any> {
        return of(MockHttpClient.response);
    }
}

const validResponse = {
    "id": "0001",
    "user": {
        "id": "2",
        "name": "Jubei",
        "surname": "Kibagami",
        "thumbUrl": "/assets/images/2.jpeg"
    },
    "people": [
        {
            "id": "1",
            "name": "Asuka",
            "surname": "Soryu Langley",
            "thumbUrl": "/assets/images/1.jpeg"
        }
    ],
    "notes": [
        {
            "authorId": "1",
            "publishingDateIso": "2021-05-20T10:21:17.250Z",
            "text": "ciao!!"
        }
    ]
};

const invalidResponse = {
    "people": [
        {
            "id": "1",
            "name": "Asuka",
            "surname": "Soryu Langley",
            "thumbUrl": "/assets/images/1.jpeg"
        }
    ],
    "notes": [
        {
            "authorId": "1",
            "publishingDateIso": "2021-05-20T10:21:17.250Z",
            "text": ""
        }
    ]
};