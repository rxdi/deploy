import { Service } from '@rxdi/core';
import { BehaviorSubject } from 'rxjs';

@Service()
export class LoggerService {
  stdout: BehaviorSubject<string> = new BehaviorSubject('');
}
