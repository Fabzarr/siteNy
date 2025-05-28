"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const reservations_module_1 = require("./reservations/reservations.module");
const configurations_module_1 = require("./configurations/configurations.module");
const menu_module_1 = require("./menu/menu.module");
const drinks_module_1 = require("./drinks/drinks.module");
const app_config_1 = require("./config/app.config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
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
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            reservations_module_1.ReservationsModule,
            configurations_module_1.ConfigurationsModule,
            menu_module_1.MenuModule,
            drinks_module_1.DrinksModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map