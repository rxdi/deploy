// tslint:disable
// graphql typescript definitions


  export interface IGraphQLResponseRoot {
    data?: IQuery | IMutation | ISubscription;
    errors?: Array<IGraphQLResponseError>;
  }

  export interface IGraphQLResponseError {
    message: string;            // Required for all errors
    locations?: Array<IGraphQLResponseErrorLocation>;
    [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
  }

  export interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  /**
    description: Query type for all get requests which will not change persistent data
  */
  export interface IQuery {
    __typename?: "Query";
    status: IStatusQueryType | null;
    getNamespace: INamespacetype | null;
    listNamespaces: INamespaceListType | null;
    getBuildHistory: IHistoryListType | null;
    listFiles: IFileType | null;
    readFile: IFileRawType | null;
    saveFile: IFileRawType | null;
    listTransactions: Array<ITransactionType> | null;
    findUser: IUserType | null;
}

  
  export interface IStatusQueryType {
    __typename?: "StatusQueryType";
    status: string | null;
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
    directory: boolean | null;
    file: boolean | null;
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
    package: string | null;
    file: string | null;
}

export   
  type ITransactionsTypeEnumEnum = 'DEPLOYED' | 'COMMITED' | 'UNKNOWN' | 'BUILD';

  
  export interface ITransactionType {
    __typename?: "TransactionType";
    _id: string | null;
    status: ITransactionsTypeEnumEnum | null;
    birthtime: string | null;
    path: string | null;
    repoFolder: string | null;
}

  
  export interface IUserType {
    __typename?: "UserType";
    message: string | null;
}

  /**
    description: Mutation type for all requests which will change persistent data
  */
  export interface IMutation {
    __typename?: "Mutation";
    insertNamespace: INamespacetype | null;
    triggerBuild: IBuildType | null;
    addTransaction: ITransactionType | null;
    checkoutTransaction: ITransactionType | null;
}

  
  export interface IBuildType {
    __typename?: "BuildType";
    status: string | null;
}

  /**
    description: Subscription type for all subscriptions via pub sub
  */
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


// tslint:enable
