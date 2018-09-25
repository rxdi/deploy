import { Commands } from '../../../commands';
export declare const nextOrDefault: (i: "--message" | "--out-dir" | "--file" | "--namespace" | "--beat" | "--html" | "--webui" | "--open-browser" | "--graphiql-playground" | "--node-only" | "--silent" | "--unminify" | "--browser" | "--v" | "--tsconfig" | "--verbose" | "--default-ipfs-node" | "--deployer-config-name", fb?: any, type?: (p: any) => any) => any;
export declare const includes: (i: "--message" | "--out-dir" | "--file" | "--namespace" | "--beat" | "--html" | "--webui" | "--open-browser" | "--graphiql-playground" | "--node-only" | "--silent" | "--unminify" | "--browser" | "--v" | "--tsconfig" | "--verbose" | "--default-ipfs-node" | "--deployer-config-name") => boolean;
export declare class ArgumentsService {
    nextOrDefault(i: Commands, fallback?: any, type?: (p: any) => any): any;
}
