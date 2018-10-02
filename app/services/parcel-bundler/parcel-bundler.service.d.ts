import { __PARCEL_BROWSER_BUILD, __PARCEL_BUILD_OUT_DIR, __PARCEL_SETTINGS } from '../../../env.injection.tokens';
export declare class ParcelBundlerService {
    private isBrowserBuild;
    private isBuildMinfied;
    private buildOutDir;
    private settings;
    constructor(isBrowserBuild: __PARCEL_BROWSER_BUILD, isBuildMinfied: __PARCEL_BROWSER_BUILD, buildOutDir: __PARCEL_BUILD_OUT_DIR, settings: __PARCEL_SETTINGS);
    prepareBundler(file: any, outDir?: any, fileName?: string): Promise<{}>;
}
