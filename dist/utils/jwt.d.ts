declare class JwtStrategy {
    private readonly JWT_SECRET;
    sign(payload: any): string;
    verify(token: string): any;
}
declare const _default: JwtStrategy;
export default _default;
