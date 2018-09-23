import { Service } from '@rxdi/core';

@Service()
export class TsConfigGenratorService {

    getTsConfig(filename: string) {
        return `
{
    "compilerOptions": {
        "declaration": true,
        "module": "commonjs",
        "target": "es6",
        "baseUrl": "src",
        "stripInternal": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "moduleResolution": "node",
        "outDir": ".",
        "lib": [
            "es2017",
            "es2016",
            "es2015",
            "es6",
            "dom",
            "esnext.asynciterable"
        ],
        "skipLibCheck": true,
        "typeRoots": [
            "node_modules/@types"
        ],
    },
    "include": [
        "."
    ],
    "files": [
        "${filename}.ts"
    ]
}`;
    }

}