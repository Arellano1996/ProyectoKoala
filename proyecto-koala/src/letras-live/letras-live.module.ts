import { Module } from '@nestjs/common';
import { LetrasLiveService } from './letras-live.service';
import { LetrasLiveGateway } from './letras-live.gateway';
import { LetrasLiveSQLService } from './letras-live-sql.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetraLive } from './entities/letra-live.entity';
import { LetraLiveController } from './letra-live.controller';

@Module({
  controllers: [LetraLiveController],
  providers: [LetrasLiveGateway, LetrasLiveService, LetrasLiveSQLService],
  imports: [
    TypeOrmModule.forFeature([
      LetraLive
    ])
  ]
})
export class LetrasLiveModule {}
