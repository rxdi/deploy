import { Observable } from 'rxjs';
import { DagModel } from '../../../env.injection.tokens';
import { IHistoryType } from '../../core/api-introspection';
export declare class BuildHistoryService {
    private buildHistoryDatabase;
    insert(doc: DagModel): Observable<DagModel>;
    find(doc: DagModel | {}): Observable<DagModel>;
    findAll(skip?: number, limit?: number, sort?: {
        name: number;
    }): Promise<IHistoryType[]>;
}
