import { __DEPLOYER_ARGUMENTS, __PARCEL_BROWSER_BUILD, __PARCEL_BUILD_OUT_DIR, __PARCEL_SETTINGS } from '../../../env.injection.tokens';
export declare class ParcelBundlerService {
    private isBrowserBuild;
    private isBuildMinfied;
    private buildOutDir;
    private parcelSettings;
    private args;
    constructor(isBrowserBuild: __PARCEL_BROWSER_BUILD, isBuildMinfied: __PARCEL_BROWSER_BUILD, buildOutDir: __PARCEL_BUILD_OUT_DIR, parcelSettings: __PARCEL_SETTINGS, args: __DEPLOYER_ARGUMENTS);
    prepareBundler(file: any): Promise<{}>;
}
