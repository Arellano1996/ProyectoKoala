import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateLetraComentariosDto } from "./crear-letra-comentarios.dto";
import { CreateLetraConfiguracionesDto } from "./crear-letra-configuraciones.dto";
import { Type } from "class-transformer";

export class UpdateLetraDto {

    @IsString()
    Letra: string;

    @IsString()
    @IsOptional()
    Tono: string;

    @IsOptional()
    @Type(() => CreateLetraComentariosDto)
    @IsArray()
    @ValidateNested({ each: true })
    Comentarios?: CreateLetraComentariosDto[] = [];
    
    @IsOptional()
    @Type(() => CreateLetraConfiguracionesDto)
    @IsArray()
    @ValidateNested({ each: true })
    Configuraciones?: CreateLetraConfiguracionesDto[] = [];
}
