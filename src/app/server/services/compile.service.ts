import { Service } from '@rxdi/core';
import { CompilePlugin } from '../../plugins/compile/compile.plugin';
import { Observable } from 'rxjs';

@Service()
export class CompileService {
  constructor(private compilePlugin: CompilePlugin) {}

  buildFile(
    folder: string = './packages/',
    file: string = 'index.ts',
    message: string = 'bla bla',
    namespace: string = '@pesho',
    buildFolder
  ): Observable<{ status: string; typings: string; module: string }> {
    return this.compilePlugin.completeBuildAndAddToIpfs(
      folder,
      file,
      message,
      namespace,
      'reactive.json',
      buildFolder
    ) as any;
  }

  pushTransaction(
    folder: string = './packages/',
    file: string = 'index.ts',
    message: string = 'bla bla',
    namespace: string = '@pesho',
    buildFolder
  ) {
    return this.compilePlugin.pushTransaction(folder, file, message, namespace, 'reactive.json', buildFolder);
  }
}
