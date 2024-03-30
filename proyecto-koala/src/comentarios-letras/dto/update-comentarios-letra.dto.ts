import { PartialType } from '@nestjs/mapped-types';
import { CreateComentariosLetraDto } from './create-comentarios-letra.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateComentariosLetraDto {

    @IsString()
    @IsOptional()
    Nombre: string;
    
    @IsString()
    @IsOptional()
    Comentario: string;
    
}
