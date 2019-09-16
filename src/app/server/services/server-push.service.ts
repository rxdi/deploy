import { PluginInterface, Inject, ExitHandlerService, AfterStarterService, Service } from '@rxdi/core';
import { createServer, Server, IncomingMessage, ServerResponse } from 'http';
import { Server as HapiServer } from 'hapi';
import { HAPI_SERVER, OpenService } from '@rxdi/hapi';
import { Subject, Observable, timer } from 'rxjs';
import { tap, filter, take, switchMapTo } from 'rxjs/operators';
import { includes, nextOrDefault } from '../../services';

@Service()
export class ServerPushService implements PluginInterface {
  serverWatcher: Server;
  connected: boolean;
  sendToClient: Subject<any> = new Subject();
  sendTime: Subject<boolean> = new Subject();
  clientConnected: Subject<boolean> = new Subject();

  constructor(
    @Inject(HAPI_SERVER) private server: HapiServer,
    private exitHandler: ExitHandlerService,
    private afterStarterService: AfterStarterService,
    private openService: OpenService
  ) {
    this.exitHandler.errorHandler.subscribe(async e => await this.stopServerWatcher());

    // this.server.events.on('response',
    //     (request) => this.sendToClient.next({ query: request.payload, response: request.response['source'] })
    // );
    const interval = nextOrDefault('--server-push-interval', 1000 * 7, a => Number(a * 1000));
    timer(0, interval)
      .pipe(tap(() => this.sendTime.next(true)))
      .subscribe();

    this.afterStarterService.appStarted
      .pipe(
        switchMapTo(this.waitXSeconds(5)),
        take(1),
        filter(() => !this.connected),
        filter(() => includes('--open-browser')),
        tap(() => this.openService.openPage(`http://${this.server.info.address}:${this.server.info.port}/webui`))
      )
      .subscribe();
  }

  waitXSeconds(sec): Observable<any> {
    return Observable.create(o => {
      const timeout = setTimeout(() => o.next(true), sec * 1000);
      return () => clearTimeout(timeout);
    });
  }

  OnInit() {
    this.register();
  }

  async register() {
    if (includes('--webui-server-watcher') || includes('--webui')) {
      this.createServerWatcher();
    }
  }

  async stopServerWatcher() {
    return await new Promise(resolve => this.serverWatcher.close(() => resolve()));
  }

  private createServerWatcher() {
    this.serverWatcher = createServer(this.OnRequest.bind(this));
    this.serverWatcher.listen(nextOrDefault('--webui-server-watcher-port', 8957));
  }

  OnRequest(req: IncomingMessage, res: ServerResponse) {
    if (req.url === '/status') {
      if (!this.connected) {
        this.clientConnected.next(true);
        res.write('data: ' + JSON.stringify({ response: { init: true } }) + '\n\n');
      }
      this.connected = true;

      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });

      this.sendToClient.subscribe(data => res.write('data: ' + JSON.stringify(data) + '\n\n'));

      this.sendTime.subscribe(data =>
        res.write('data: ' + JSON.stringify({ time: new Date().toLocaleTimeString() }) + '\n\n')
      );

      this.sendTime.subscribe(data =>
        res.write(
          'data: ' +
            JSON.stringify({
              config: { graphql: {}, hapi: this.server.info },
            }) +
            '\n\n'
        )
      );
      req.on('end', () => {
        this.connected = false;
        req.destroy();
      });
      return;
    }
    res.statusCode = 400;
    return res.end();
  }
}
