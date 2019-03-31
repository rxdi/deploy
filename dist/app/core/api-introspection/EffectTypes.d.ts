export declare const EffectTypes: {
    findUser: "findUser";
    subscribeToUserMessagesBasic: "subscribeToUserMessagesBasic";
    listenForNewBuilds: "listenForNewBuilds";
    getBuildHistory: "getBuildHistory";
    buildStatus: "buildStatus";
};
export declare type EffectTypes = keyof typeof EffectTypes;
