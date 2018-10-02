import { Service, Inject } from "@rxdi/core";
import { __NAMESPACE_DB } from "../../../../env.injection.tokens";
import { INamespacetype } from '../../../core/api-introspection/index';

@Service()
export class NamespaceService {

    @Inject(__NAMESPACE_DB) private namespace: __NAMESPACE_DB;

    getNamespace(name: string) {
        return new Promise((resolve, reject) => {
            this.namespace.find({ name })
                .exec((e, d) => {
                    if (e) {
                        reject(e);
                    }
                    resolve(d);
                });
        });
    }


    getNamespaceById(_id: string) {
        return new Promise((resolve, reject) => {
            this.namespace.findOne({ _id }, (e, d) => {
                if (e) {
                    reject(e);
                }
                console.log(d);
                resolve(d);
            })
        });
    }

    searchForDuplicates(name) {
        return new Promise((resolve, reject) => {
            this.namespace.findOne({ name }, (e, d) => {
                if (e) {
                    reject(e);
                }
                resolve(d);
            })
        });
    }

    async insert(doc: { name: string }) {
        return await new Promise((resolve, reject) => {
            this.namespace.insert(doc, (e, d) => {
                if (e) {
                    reject(e)
                }
                resolve(d);
            });
        });
    }
    listNamespaces(skip: number = 0, limit: number = 100, query = {}): Promise<INamespacetype[]> {
        return new Promise((resolve, reject) => {
            this.namespace
                .find(query)
                .sort(query)
                .skip(skip)
                .limit(limit)
                .exec((e, d: INamespacetype[]) => {
                    if (e) {
                        reject(e);
                    }
                    resolve(d);
                });
        });
    }

}