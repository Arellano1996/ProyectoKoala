import { Module } from '@nestjs/common';
import { LetrasService } from './letras.service';
import { LetrasController } from './letras.controller';
import { Letra } from './entities/letra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [LetrasController],
  providers: [LetrasService],
  imports:[
    TypeOrmModule.forFeature([
      Letra
    ])
  ]
})
export class LetrasModule {}
