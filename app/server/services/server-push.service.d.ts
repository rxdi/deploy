/// <reference types="node" />
import { PluginInterface, ExitHandlerService, AfterStarterService } from '@rxdi/core';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { Server as HapiServer } from 'hapi';
import { OpenService } from '@rxdi/hapi';
import { Subject, Observable } from 'rxjs';
export declare class ServerPushService implements PluginInterface {
    private server;
    private exitHandler;
    private afterStarterService;
    private openService;
    serverWatcher: Server;
    connected: boolean;
    sendToClient: Subject<any>;
    sendTime: Subject<boolean>;
    clientConnected: Subject<boolean>;
    constructor(server: HapiServer, exitHandler: ExitHandlerService, afterStarterService: AfterStarterService, openService: OpenService);
    waitXSeconds(sec: any): Observable<any>;
    register(): Promise<void>;
    stopServerWatcher(): Promise<{}>;
    private createServerWatcher;
    OnRequest(req: IncomingMessage, res: ServerResponse): void;
}
