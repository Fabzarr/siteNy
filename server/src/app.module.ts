import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ConfigurationsModule } from './configurations/configurations.module';
import { MenuModule } from './menu/menu.module';
import { DrinksModule } from './drinks/drinks.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('app.database.host'),
        port: configService.get('app.database.port'),
        username: configService.get('app.database.username'),
        password: configService.get('app.database.password'),
        database: configService.get('app.database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        keepConnectionAlive: true,
        logging: ['error', 'warn'],
        logger: 'advanced-console',
        ssl: false,
        retryAttempts: 5,
        retryDelay: 3000,
        pool: {
          max: configService.get('app.database.maxConnections') || 20,
          min: 5,
          idleTimeout: 60000,
          acquireTimeout: 60000,
          reapIntervalMillis: 1000,
          evictionRunIntervalMillis: 30000,
          softIdleTimeoutMillis: 30000,
        },
        extra: {
          query_timeout: 5000,
          statement_timeout: 5000,
          maxConnections: 20,
          connectionTimeoutMillis: 10000,
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ReservationsModule,
    ConfigurationsModule,
    MenuModule,
    DrinksModule,
  ],
})
export class AppModule {} 