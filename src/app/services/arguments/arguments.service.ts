import { Service } from '@rxdi/core';
import { Commands } from '../../../commands';
import { nextOrDefault } from '../helpers/helpers';

@Service()
export class ArgumentsService {
  nextOrDefault(i: Commands, fallback: any = null, type = p => p) {
    return nextOrDefault(i, fallback, type);
  }
}
