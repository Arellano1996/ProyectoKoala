import { IsOptional, IsString } from 'class-validator';

export class UpdateConfiguracionesLetraDto {

    @IsString()
    @IsOptional()
    Nombre: string;
    
    @IsString()
    @IsOptional()
    Configuracion: string;
}
