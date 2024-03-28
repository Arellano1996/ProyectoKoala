//#region Imports
import { ArrayMinSize, IsArray, IsOptional, IsString, IsUUID, MinLength, Validate, ValidateNested } from 'class-validator';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { Type } from 'class-transformer';
import { Genero } from 'src/generos/entities/genero.entity';
import { CreateArtistaDto } from 'src/artistas/dto/create-artista.dto';
import { CreateGeneroDto } from 'src/generos/dto/create-genero.dto';
import { CreateCancioneLetraDto } from './crear-cancion-letra.dto';
import { CreateCancioneLinkDto } from './crear-cancion-link.dto';
import { asignarUsuarioIdParaEditarCancionLetra } from 'src/common/validaciones/asignarUsuarioIdParaEditarCancionLetra';
//#endregion Imports

export class UpdateCancioneDto {

    @IsString({ message: 'Nombre debe ser tipo string.'})
    @MinLength(1,{ message: 'Nombre debe tener al menos 1 caracter.'})
    // @IsNotEmpty({ message: 'Nombre es obligatorio.'})
    @IsOptional()
    Nombre: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Tono?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Acordes?: string;

    @IsOptional()
    @Type(() => CreateCancioneLetraDto) // Transforma cada objeto al objeto especificado
    @ValidateNested({ each: true })
    @Validate( asignarUsuarioIdParaEditarCancionLetra )
    Letras: CreateCancioneLetraDto[] = [];

    @IsOptional()
    @Type(() => CreateCancioneLinkDto) // Transforma cada objeto a CreateLinkDto
    @ValidateNested({ each: true })
    Links: CreateCancioneLinkDto[] = [];

    @IsArray({ message: 'Debe ser un arreglo.'})
    // @ArrayMinSize(1, { message: 'Debe haber al menos un artista.' })
    @ValidateNested({ each: true }) // Validar cada objeto del arreglo
    @Type(() => CreateArtistaDto) // Tipo del objeto que se espera en el arreglo
    Artistas: Artista[] = [];

    @IsArray({ message: 'Debe ser un arreglo.'})
    // @ArrayMinSize(1, { message: 'Debe haber al menos un genero.' })
    @ValidateNested({ each: true }) // Validar cada objeto del arreglo
    @Type(() => CreateGeneroDto) // Tipo del objeto que se espera en el arreglo
    Generos: Genero[] = [];
}
