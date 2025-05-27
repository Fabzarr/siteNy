import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as express from 'express';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  try {
    const logger = new Logger('Bootstrap');
    
    // Create the app instance with improved settings
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'debug', 'log'],
      bodyParser: true,
      cors: true,
      abortOnError: false,
    });

    const configService = app.get(ConfigService);

    // Security middleware
    app.use(helmet());
    app.use(compression());
    
    // Enable CORS with improved configuration
    app.enableCors({
      origin: configService.get('app.cors.origin'),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      exposedHeaders: ['Content-Range', 'X-Content-Range'],
      credentials: configService.get('app.cors.credentials'),
      maxAge: 3600,
    });

    // Use Express middleware for improved stability
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Enable validation
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }));

    // Global prefix
    app.setGlobalPrefix('api');

    const port = configService.get('app.port');
    
    // Improved server configuration
    const server = await app.listen(port, '0.0.0.0', () => {
      logger.log(`Application is running on: http://localhost:${port}`);
      logger.log(`API is available at: http://localhost:${port}/api`);
    });

    // Configure server timeouts
    server.keepAliveTimeout = 65000;
    server.headersTimeout = 66000;
    server.timeout = 120000;

    // Handle shutdown gracefully
    const signals = ['SIGTERM', 'SIGINT'];
    
    for (const signal of signals) {
      process.on(signal, async () => {
        logger.log(`Received ${signal} signal. Starting graceful shutdown...`);
        
        try {
          await app.close();
          logger.log('Application closed successfully');
          process.exit(0);
        } catch (error) {
          logger.error('Error during shutdown:', error);
          process.exit(1);
        }
      });
    }

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      // Don't exit the process, let it recover
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
      // Don't exit the process, let it recover
    });

  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1);
  }
}

// Improved error handling with detailed logging
const logger = new Logger('Process');

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  // Give the server time to send response before potentially crashing
  setTimeout(() => process.exit(1), 1000);
});

bootstrap(); 