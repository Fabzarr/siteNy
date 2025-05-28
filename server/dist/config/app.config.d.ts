declare const _default: (() => {
    port: number;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        maxConnections: number;
        sslMode: string;
    };
    cors: {
        origin: string;
        credentials: boolean;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        maxConnections: number;
        sslMode: string;
    };
    cors: {
        origin: string;
        credentials: boolean;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
}>;
export default _default;
