import { Service, Container, Inject } from '@rxdi/core';
import Bundler = require('parcel-bundler');
import { __DEPLOYER_ARGUMENTS, __PARCEL_BROWSER_BUILD, __PARCEL_MINIFY, __PARCEL_BUILD_OUT_DIR, __PARCEL_SETTINGS } from '../../../env.injection.tokens';

@Service()
export class ParcelBundlerService {

    constructor(
        @Inject(__PARCEL_BROWSER_BUILD) private isBrowserBuild: __PARCEL_BROWSER_BUILD,
        @Inject(__PARCEL_MINIFY) private isBuildMinfied: __PARCEL_BROWSER_BUILD,
        @Inject(__PARCEL_BUILD_OUT_DIR) private buildOutDir: __PARCEL_BUILD_OUT_DIR,
        @Inject(__PARCEL_SETTINGS) private parcelSettings: __PARCEL_SETTINGS,
        @Inject(__DEPLOYER_ARGUMENTS) private args: __DEPLOYER_ARGUMENTS,
    ) {}

    async prepareBundler(file) {
        return new Promise((resolve, reject) => {
            const options = {
                target: this.isBrowserBuild ? 'browser' : 'node',
                minify: this.isBuildMinfied,
                outDir: this.buildOutDir
            };
            console.log(this.buildOutDir);

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
