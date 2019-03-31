export interface IGraphQLResponseRoot {
    data?: IQuery | IMutation | ISubscription;
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
    getNamespace: INamespacetype | null;
    listNamespaces: INamespaceListType | null;
    getBuildHistory: IHistoryListType | null;
    listFiles: IFileType | null;
    readFile: IFileRawType | null;
    saveFile: IFileRawType | null;
    findUser: IUserType | null;
}
export interface INamespacetype {
    __typename?: "Namespacetype";
    _id: string | null;
    name: string | null;
    builds: Array<IHistoryType> | null;
}
export interface IHistoryType {
    __typename?: "HistoryType";
    _id: string | null;
    name: string | null;
    typings: string | null;
    module: string | null;
    metadata: string | null;
    message: string | null;
    hash: string | null;
    status: IBuildStatusType | null;
    namespaceId: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}
export interface IBuildStatusType {
    __typename?: "BuildStatusType";
    file: IBuildStatus | null;
    typings: IBuildStatus | null;
    module: IBuildStatus | null;
}
export interface IBuildStatus {
    __typename?: "BuildStatus";
    status: string | null;
    message: string | null;
}
export interface INamespaceListType {
    __typename?: "NamespaceListType";
    count: number | null;
    rows: Array<INamespacetype> | null;
}
export interface IBuildWhereType {
    namespaceId?: string | null;
    name?: string | null;
}
export interface IHistoryListType {
    __typename?: "HistoryListType";
    count: number | null;
    rows: Array<IHistoryType> | null;
}
export interface IFileType {
    __typename?: "FileType";
    paths: Array<IFolderStructureType> | null;
}
export interface IFolderStructureType {
    __typename?: "FolderStructureType";
    path: string | null;
    directory: string | null;
    file: string | null;
    name: string | null;
    status: IFileStatusType | null;
}
export interface IFileStatusType {
    __typename?: "FileStatusType";
    size: string | null;
    birthtime: string | null;
    ctime: string | null;
    mtime: string | null;
    atime: string | null;
    birthtimeMs: string | null;
    ctimeMs: string | null;
    mtimeMs: string | null;
    atimeMs: string | null;
    blocks: number | null;
    ino: number | null;
    blksize: number | null;
    rdev: number | null;
    gid: number | null;
    uid: number | null;
    nlink: number | null;
    mode: number | null;
    dev: number | null;
}
export interface IFileRawType {
    __typename?: "FileRawType";
    file: string | null;
}
export interface IUserType {
    __typename?: "UserType";
    message: string | null;
}
export interface IMutation {
    __typename?: "Mutation";
    insertNamespace: INamespacetype | null;
    triggerBuild: IBuildType | null;
}
export interface IBuildType {
    __typename?: "BuildType";
    status: string | null;
}
export interface ISubscription {
    __typename?: "Subscription";
    listenForNewBuilds: IHistoryType | null;
    buildStatus: IBuildStatusType | null;
    processStdOut: IProcessStdOutType | null;
    subscribeToUserMessagesBasic: IUserType | null;
}
export interface IProcessStdOutType {
    __typename?: "ProcessStdOutType";
    stdout: string | null;
}
