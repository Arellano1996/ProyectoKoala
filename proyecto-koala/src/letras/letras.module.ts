import { Module } from '@nestjs/common';
import { LetrasService } from './letras.service';
import { LetrasController } from './letras.controller';

@Module({
  controllers: [LetrasController],
  providers: [LetrasService],
})
export class LetrasModule {}
