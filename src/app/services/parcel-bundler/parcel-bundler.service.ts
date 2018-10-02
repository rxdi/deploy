import { Service, Inject } from '@rxdi/core';
import Bundler = require('parcel-bundler');
import { __PARCEL_BROWSER_BUILD, __PARCEL_MINIFY, __PARCEL_BUILD_OUT_DIR, __PARCEL_SETTINGS } from '../../../env.injection.tokens';

@Service()
export class ParcelBundlerService {

    constructor(
        @Inject(__PARCEL_BROWSER_BUILD) private isBrowserBuild: __PARCEL_BROWSER_BUILD,
        @Inject(__PARCEL_MINIFY) private isBuildMinfied: __PARCEL_BROWSER_BUILD,
        @Inject(__PARCEL_BUILD_OUT_DIR) private buildOutDir: __PARCEL_BUILD_OUT_DIR,
        @Inject(__PARCEL_SETTINGS) private settings: __PARCEL_SETTINGS
    ) {}

    async prepareBundler(file, outDir = null, fileName?: string) {
        return new Promise((resolve, reject) => {
            const options = {
                target: this.isBrowserBuild ? 'browser' : 'node',
                minify: this.isBuildMinfied,
                outFile: fileName,
                outDir: outDir || this.buildOutDir,
                ...this.settings
            };
            const bundler = new Bundler(file, options);
            let bundle = null;
            bundler.on('bundled', (compiledBundle) => {
                // const inter: {
                //     id; name; basename; relativeName; options; encoding; type; processed; contents; ast; generated; hash; parentDeps; dependencies
                //     depAssets; parentBundle; bundles; cacheData; startTime; endTime; buildTime; bundledSize; resolver;
                // } = compiledBundle.entryAsset;
                // console.log(inter.buildTime, inter.startTime, inter.endTime, inter.bundledSize);
                bundle = compiledBundle;
            });
            bundler.on('buildEnd', () => {
                process.argv.toString().includes('--silent') ? console.log = () => null : process.stdout.write(`Parcel Build finished! Bundle source: ${bundle.name}\n`);
                bundle = null;
                setTimeout(() => resolve(), 1000);
            });
            bundler.bundle();
        });
    }

}
