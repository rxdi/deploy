
import { Service } from '@rxdi/core';

export const nextOrDefault = (i: string, fb: any = true, type = (p) => (p)) => {
    if (process.argv.toString().includes(i)) {
        const isNextArgumentPresent = process.argv[process.argv.indexOf(i) + 1];
        if (!isNextArgumentPresent) {
            return fb;
        }
        return type(isNextArgumentPresent);
    }
    return fb;
}

export const includes = (i) => process.argv.toString().includes(i);

@Service()
export class ArgumentsService {

    nextOrDefault(i: string, fallback: any = null, type = (p) => (p)) {
        return nextOrDefault(i, fallback, type);
    }

}