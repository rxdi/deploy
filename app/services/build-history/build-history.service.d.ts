import { Observable } from 'rxjs';
import { HistoryModel } from '../../../env.injection.tokens';
import { TableService } from '../table-service/table-service';
export declare class BuildHistoryService {
    private tableService;
    private buildHistoryDatabase;
    constructor(tableService: TableService);
    insert(doc: HistoryModel): Observable<HistoryModel>;
    find(doc: HistoryModel | {}): Observable<HistoryModel>;
    showHistoryTable(): Observable<HistoryModel>;
    findAll(): Observable<HistoryModel>;
}
