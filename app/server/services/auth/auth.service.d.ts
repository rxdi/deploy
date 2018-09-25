import { AuthInternalService } from '@gapi/auth';
export interface UserInfo {
    scope: ['ADMIN'];
    type: 'ADMIN';
    iat: number;
}
export interface TokenData {
    id: any;
    email: string;
    scope: Array<string>;
}
export declare class AuthService {
    private authService;
    constructor(authService: AuthInternalService);
    onSubOperation(message: any, params: any, webSocket: any): any;
    onSubConnection(connectionParams: any): Promise<any>;
    validateToken(token: string, requestType?: 'Query' | 'Subscription'): Promise<any>;
    signJWTtoken(tokenData: TokenData): string;
    issueJWTToken(tokenData: TokenData): string;
    verifyToken(token: string): TokenData;
    decryptPassword(password: string): string;
    encryptPassword(password: string): string;
}
