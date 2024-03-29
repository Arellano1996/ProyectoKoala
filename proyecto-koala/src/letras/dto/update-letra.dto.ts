import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateLetraDto {

    @IsUUID()
    LetraId: string;

    @IsString()
    @IsOptional()
    Letra: string;

    @IsString()
    @IsOptional()
    Acordes: string;

    @IsOptional()
    @IsArray()
    Comentarios: string[] = [];
    
    @IsOptional()
    @IsArray()
    Configuraciones: string[] = [];
}
