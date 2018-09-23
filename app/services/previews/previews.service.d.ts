import { Observable } from 'rxjs';
import { PreviewsModel } from '../../../env.injection.tokens';
export declare class PreviwsService {
    private previwsDatabase;
    insert(doc: PreviewsModel): Observable<PreviewsModel>;
    find(doc: PreviewsModel): Observable<PreviewsModel>;
}
