import { HttpClient } from '@angular/common/http/http';
import { map } from 'rxjs/operators';
import { BoardEntity } from './entities';

export class RemoteStorage {

    constructor(private http: HttpClient) { }

    find(): Promise<BoardEntity> {
        return this.http.get('/assets/board.json')
            .pipe(map(json => json as BoardEntity))
            .toPromise()
    }
}