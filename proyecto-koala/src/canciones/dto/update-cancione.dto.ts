import { PartialType } from '@nestjs/mapped-types';
import { CreateCancioneDto } from './create-cancione.dto';
import { IsString, IsUUID, MinLength } from 'class-validator';

export class UpdateCancioneDto extends PartialType(CreateCancioneDto) {

    @IsUUID()
    CancionId: string;
}
