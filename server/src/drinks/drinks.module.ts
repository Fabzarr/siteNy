import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drink } from './entities/drink.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drink])],
  controllers: [],
  providers: [],
})
export class DrinksModule {} 