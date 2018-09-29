import { Observable } from 'rxjs';
import { PreviousModel } from '../../../env.injection.tokens';
export declare class PreviwsService {
    private previwsDatabase;
    insert(doc: PreviousModel): Observable<PreviousModel>;
    find(doc: PreviousModel): Observable<PreviousModel>;
}
