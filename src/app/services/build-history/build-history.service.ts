import { Service, Inject } from '@rxdi/core';
import { Observable } from 'rxjs';
import { __BUILD_HISTORY_DATABASE, DagModel } from '../../../env.injection.tokens';
import { TableService } from '../table-service/table-service';

@Service()
export class BuildHistoryService {
    @Inject(__BUILD_HISTORY_DATABASE) private buildHistoryDatabase: __BUILD_HISTORY_DATABASE;
    constructor(
        private tableService: TableService
    ) {
        // console.log('' + this.showHistoryTable());
    }
    insert(doc: DagModel): Observable<DagModel> {
        return new Observable(o => {
            this.buildHistoryDatabase.insert(doc, (e, d) => {
                if (e) {
                    throw new Error('Unable to insert to database');
                }
                o.next(d);
            });
        })
    }

    find(doc: DagModel | {}): Observable<DagModel> {
        return new Observable(o => {
            this.buildHistoryDatabase.find(doc, (e, d) => {
                if (e) {
                    o.error(e);
                }
                o.next(d);
            }).limit(100);
        })
    }

    showHistoryTable(): Observable<DagModel> {
        console.log(this.findAll());
        const table = this.tableService.getHistoryTable(<any>this.findAll());
        console.log('', table);
        return table;
    }

    findAll(){
        return this.find({});
    }



}