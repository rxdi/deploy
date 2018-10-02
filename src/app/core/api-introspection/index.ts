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
    getNamespace: INamespacetype | null;
    listNamespaces: INamespaceListType | null;
    getBuildHistory: IHistoryListType | null;
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
    date: string | null;
    status: IBuildStatusType | null;
    namespaceId: string | null;
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
}

  
  export interface IBuildType {
    __typename?: "BuildType";
    status: string | null;
}

  /**
    description: Subscription type for all rabbitmq subscriptions via pub sub
  */
  export interface ISubscription {
    __typename?: "Subscription";
    listenForNewBuilds: IHistoryType | null;
    buildStatus: IBuildStatusType | null;
    subscribeToUserMessagesBasic: IUserType | null;
}


// tslint:enable
