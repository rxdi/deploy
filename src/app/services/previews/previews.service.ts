import { Service, Inject } from '@rxdi/core';
import { Observable } from 'rxjs';
import { __PREVIWS_DATABASE, PreviewsModel } from '../../../env.injection.tokens';

@Service()
export class PreviwsService {

    @Inject(__PREVIWS_DATABASE) private previwsDatabase: __PREVIWS_DATABASE;

    insert(doc: PreviewsModel): Observable<PreviewsModel> {
        return new Observable(o => {
            this.previwsDatabase.insert(doc, (e, d) => {
                if (e) {
                    throw new Error('Unable to insert to database');
                }
                o.next(d);
            });
        })
    }

    find(doc: PreviewsModel): Observable<PreviewsModel> {
        return new Observable(o => {
            this.previwsDatabase.find(doc, (e, d) => {
                if (e) {
                    o.error(e);
                }
                o.next(d);
            });
        })
    }
}