"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const express = require("express");
const helmet_1 = require("helmet");
const compression = require("compression");
async function bootstrap() {
    try {
        const logger = new common_1.Logger('Bootstrap');
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ['error', 'warn', 'debug', 'log'],
            bodyParser: true,
            cors: true,
            abortOnError: false,
        });
        const configService = app.get(config_1.ConfigService);
        app.use((0, helmet_1.default)());
        app.use(compression());
        app.enableCors({
            origin: configService.get('app.cors.origin'),
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
            exposedHeaders: ['Content-Range', 'X-Content-Range'],
            credentials: configService.get('app.cors.credentials'),
            maxAge: 3600,
        });
        app.use(express.json({ limit: '10mb' }));
        app.use(express.urlencoded({ extended: true, limit: '10mb' }));
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }));
        app.setGlobalPrefix('api');
        const port = configService.get('app.port');
        const server = await app.listen(port, '0.0.0.0', () => {
            logger.log(`Application is running on: http://localhost:${port}`);
            logger.log(`API is available at: http://localhost:${port}/api`);
        });
        server.keepAliveTimeout = 65000;
        server.headersTimeout = 66000;
        server.timeout = 120000;
        const signals = ['SIGTERM', 'SIGINT'];
        for (const signal of signals) {
            process.on(signal, async () => {
                logger.log(`Received ${signal} signal. Starting graceful shutdown...`);
                try {
                    await app.close();
                    logger.log('Application closed successfully');
                    process.exit(0);
                }
                catch (error) {
                    logger.error('Error during shutdown:', error);
                    process.exit(1);
                }
            });
        }
        process.on('uncaughtException', (error) => {
            logger.error('Uncaught Exception:', error);
        });
        process.on('unhandledRejection', (reason, promise) => {
            logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
        });
    }
    catch (error) {
        console.error('Error starting the application:', error);
        process.exit(1);
    }
}
const logger = new common_1.Logger('Process');
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', { promise, reason });
});
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    setTimeout(() => process.exit(1), 1000);
});
bootstrap();
//# sourceMappingURL=main.js.map