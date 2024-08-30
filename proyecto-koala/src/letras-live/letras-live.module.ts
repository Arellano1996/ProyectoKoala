import { Module } from '@nestjs/common';
import { LetrasLiveService } from './letras-live.service';
import { LetrasLiveGateway } from './letras-live.gateway';

@Module({
  providers: [LetrasLiveGateway, LetrasLiveService],
})
export class LetrasLiveModule {}
