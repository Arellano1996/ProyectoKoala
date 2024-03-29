import { PartialType } from '@nestjs/mapped-types';
import { CreateConfiguracionesLetraDto } from './create-configuraciones-letra.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateConfiguracionesLetraDto {

    @IsString()
    @IsOptional()
    Nombre: string;
    
    @IsString()
    @IsOptional()
    Configuracion: string;
}
