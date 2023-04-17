export declare class TokenMiddleware {
    verifyAdmin(headers: any): Promise<string>;
    verifyUser(headers: any): Promise<string>;
}
