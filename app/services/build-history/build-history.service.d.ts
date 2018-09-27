import { Observable } from 'rxjs';
import { DagModel } from '../../../env.injection.tokens';
import { TableService } from '../table-service/table-service';
export declare class BuildHistoryService {
    private tableService;
    private buildHistoryDatabase;
    constructor(tableService: TableService);
    insert(doc: DagModel): Observable<DagModel>;
    find(doc: DagModel | {}): Observable<DagModel>;
    showHistoryTable(): Observable<DagModel>;
    findAll(): Observable<DagModel>;
}
