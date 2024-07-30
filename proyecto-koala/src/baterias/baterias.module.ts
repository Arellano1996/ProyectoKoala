import { Module } from '@nestjs/common';
import { BateriasService } from './baterias.service';
import { BateriasController } from './baterias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bateria } from './entities/bateria.entity';

@Module({
  controllers: [BateriasController],
  providers: [BateriasService],
  imports:[
    TypeOrmModule.forFeature([ Bateria ])
  ]
})
export class BateriasModule {}
