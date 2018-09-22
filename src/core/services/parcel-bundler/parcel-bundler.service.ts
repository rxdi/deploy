import { Service, Container } from '@rxdi/core';
import Bundler = require('parcel-bundler');

@Service()
export class ParcelBundlerService {

    async prepareBundler(
        file,
        settings: { outDir?: string } = {},
        target: 'node' | 'browser' = process.argv.toString().includes('--browser') ? 'browser' : 'node',
    ) {
        return new Promise((resolve, reject) => {
            const options = {
                target,
                minify: true,
                ...settings,
                watch: false,
                logLevel: 3,
                detailedReport: true
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
                process.stdout.write(`Gapi Application build finished! ${file}\n`);
                process.stdout.write(`Bundle source: ${bundle.name}`);
                bundle = null;
                setTimeout(() => resolve(), 1000);
            });
            bundler.bundle();
        });
    }

}

Container.get(ParcelBundlerService);

