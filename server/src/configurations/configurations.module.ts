import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './entities/configuration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Configuration])],
  controllers: [],
  providers: [],
})
export class ConfigurationsModule {} 