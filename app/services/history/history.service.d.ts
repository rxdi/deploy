import { Observable } from 'rxjs';
import { HistoryModel } from '../../../env.injection.tokens';
import { TableService } from '../table-service/table-service';
export declare class HistoryService {
    private tableService;
    private historyDatabase;
    constructor(tableService: TableService);
    insert(doc: HistoryModel): Observable<HistoryModel>;
    find(doc: HistoryModel | {}): Observable<HistoryModel>;
    showHistoryTable(): Observable<HistoryModel>;
    findAll(): Observable<HistoryModel>;
}
