import { HttpClient } from '@angular/common/http/http';
import { map } from 'rxjs/operators';
import { ProcessEntity } from './entities';

export class RemoteStorage {

    constructor(private http: HttpClient) { }

    find(): Promise<ProcessEntity> {
        return this.http.get('/assets/json/process.json')
            .pipe(map(json => json as ProcessEntity))
            .toPromise()
    }
}