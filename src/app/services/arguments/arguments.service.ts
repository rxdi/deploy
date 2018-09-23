
import { Service } from '@rxdi/core';

export const nextOrDefault = (i: string, fb: any = null, type = (p) => (p)) => process.argv.toString().includes(i) ? type(process.argv[process.argv.indexOf(i) + 1]) : fb

@Service()
export class ArgumentsService {

    nextOrDefault(i: string, fallback: any = null, type = (p) => (p)) {
        return nextOrDefault(i, fallback, type);
    }

}