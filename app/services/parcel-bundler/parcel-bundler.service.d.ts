import { __PARCEL_BROWSER_BUILD, __PARCEL_BUILD_OUT_DIR } from '../../../env.injection.tokens';
export declare class ParcelBundlerService {
    private isBrowserBuild;
    private isBuildMinfied;
    private buildOutDir;
    constructor(isBrowserBuild: __PARCEL_BROWSER_BUILD, isBuildMinfied: __PARCEL_BROWSER_BUILD, buildOutDir: __PARCEL_BUILD_OUT_DIR);
    prepareBundler(file: any): Promise<{}>;
}
