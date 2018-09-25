
import { Service } from '@rxdi/core';
import { Commands } from '../../../commands';

export const nextOrDefault = (i: Commands, fb: any = true, type = (p) => (p)) => {
    if (process.argv.toString().includes(i)) {
        const isNextArgumentPresent = process.argv[process.argv.indexOf(i) + 1];
        if (!isNextArgumentPresent) {
            return fb;
        }
        if (!isNextArgumentPresent.includes('--')) {
            return fb;
        }
        return type(isNextArgumentPresent);
    }
    return fb;
}

export const includes = (i: Commands) => process.argv.toString().includes(i);

@Service()
export class ArgumentsService {

    nextOrDefault(i: Commands, fallback: any = null, type = (p) => (p)) {
        return nextOrDefault(i, fallback, type);
    }

}