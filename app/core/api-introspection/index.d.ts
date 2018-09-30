export interface IGraphQLResponseRoot {
    data?: IQuery | ISubscription;
    errors?: Array<IGraphQLResponseError>;
}
export interface IGraphQLResponseError {
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    [propName: string]: any;
}
export interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
}
export interface IQuery {
    __typename?: "Query";
    getBuildHistory: IHistoryListType | null;
    findUser: IUserType | null;
}
export interface IHistoryListType {
    __typename?: "HistoryListType";
    count: number | null;
    rows: Array<IHistoryType> | null;
}
export interface IHistoryType {
    __typename?: "HistoryType";
    name: string | null;
    typings: string | null;
    module: string | null;
    metadata: string | null;
    message: string | null;
    hash: string | null;
    date: string | null;
    previews: Array<string> | null;
    dependencies: Array<string> | null;
    packages: Array<IHistoryPackageType> | null;
    ipfs: Array<IHistoryIpfsType> | null;
}
export interface IHistoryPackageType {
    __typename?: "HistoryPackageType";
    name: string | null;
    version: string | null;
}
export interface IHistoryIpfsType {
    __typename?: "HistoryIpfsType";
    provider: string | null;
    dependencies: Array<string> | null;
}
export interface IUserType {
    __typename?: "UserType";
    message: string | null;
}
export interface ISubscription {
    __typename?: "Subscription";
    listenForNewBuilds: IHistoryType | null;
    buildStatus: IBuildStatusType | null;
    subscribeToUserMessagesBasic: IUserType | null;
}
export interface IBuildStatusType {
    __typename?: "BuildStatusType";
    status: string | null;
}
