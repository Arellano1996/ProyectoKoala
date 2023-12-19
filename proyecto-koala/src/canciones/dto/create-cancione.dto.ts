import { IsArray, IsNumberString, IsObject, IsOptional, IsString, MinLength } from "class-validator";
import { Artista } from "src/artistas/entities/artistas.entity";
import { Genero } from "src/generos/entities/genero.entity";
import { IsNull } from "typeorm";

export class CreateCancioneDto {
    
    @IsString()
    @MinLength(1)
    Creador: string;

    @IsString()
    @MinLength(1)
    Nombre: string;
    
    @IsString()
    @MinLength(1)
    @IsOptional()
    Tono?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Acordes?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Letra?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Link?: string;

    // @ManyToMany(type => Usuario, Usuario => Usuario.Canciones)
    // Usuarios: Usuario[];

    @IsArray()
    Artistas: Artista[];

    @IsArray()
    Generos: Genero[];
}
