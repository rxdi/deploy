import { Server } from 'hapi';
import { __ROOT_FOLDER } from '../../../env.injection.tokens';
export declare class WebUiPlugin {
    private server;
    private root_folder;
    constructor(server: Server, root_folder: __ROOT_FOLDER);
    register(): Promise<void>;
}
