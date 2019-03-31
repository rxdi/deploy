import { OnInit } from '@rxdi/core';
import { Server } from 'hapi';
import { __ROOT_FOLDER } from '../../../env.injection.tokens';
export declare class WebUiService implements OnInit {
    private server;
    private root_folder;
    constructor(server: Server, root_folder: __ROOT_FOLDER);
    OnInit(): void;
    register(): Promise<void>;
}
