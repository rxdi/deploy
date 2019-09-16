import { Service, Inject } from '@rxdi/core';
import { Observable } from 'rxjs';
import {
  __BUILD_HISTORY_DATABASE,
  DagModel,
} from '../../../env.injection.tokens';
import { IHistoryType } from '../../core/api-introspection';

@Service()
export class BuildHistoryService {
  @Inject(__BUILD_HISTORY_DATABASE)
  private buildHistoryDatabase: __BUILD_HISTORY_DATABASE;
  insert(doc: DagModel): Observable<DagModel> {
    return new Observable(o => {
      this.buildHistoryDatabase.insert(doc, (e, d) => {
        if (e) {
          throw new Error('Unable to insert to database');
        }
        o.next(d);
      });
    });
  }

  find(doc: DagModel | {}): Observable<DagModel> {
    return new Observable(o => {
      this.buildHistoryDatabase.find(doc, (e, d) => {
        if (e) {
          o.error(e);
        }
        o.next(d);
      });
    });
  }

  findAll(
    skip: number = 0,
    limit: number = 100,
    sort = { createdAt: -1 },
    where = {}
  ): Promise<IHistoryType[]> {
    return new Promise((resolve, reject) => {
      this.buildHistoryDatabase
        .find(where)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec((e, d: any) => {
          if (e) {
            reject(e);
          }
          resolve(
            d
              .map(doc => {
                doc.createdAt = new Date(doc.createdAt).valueOf();
                return doc;
              })
              .sort((a, b) => b.createdAt - a.createdAt)
              .map(doc => {
                doc.createdAt = new Date(doc.createdAt);
                return doc;
              })
          );
        });
    });
  }
}
