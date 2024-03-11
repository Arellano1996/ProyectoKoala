import { PartialType } from '@nestjs/mapped-types';
import { CreateCancioneDto } from './create-cancione.dto';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from 'class-validator';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { Type } from 'class-transformer';
import { Genero } from 'src/generos/entities/genero.entity';
import { CreateArtistaDto } from 'src/artistas/dto/create-artista.dto';
import { CreateGeneroDto } from 'src/generos/dto/create-genero.dto';

export class UpdateCancioneDto {

    @IsUUID()
    @IsOptional()
    CancionId: string;

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

    @IsString()
    @MinLength(1)
    @IsOptional()
    Letra?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Link?: string;

    @IsArray({ message: 'Debe ser un arreglo.'})
    @ArrayMinSize(1, { message: 'Debe haber al menos un artista.' })
    @ValidateNested({ each: true }) // Validar cada objeto del arreglo
    @Type(() => CreateArtistaDto) // Tipo del objeto que se espera en el arreglo
    Artistas: Artista[];

    @IsArray({ message: 'Debe ser un arreglo.'})
    @ArrayMinSize(1, { message: 'Debe haber al menos un genero.' })
    @ValidateNested({ each: true }) // Validar cada objeto del arreglo
    @Type(() => CreateGeneroDto) // Tipo del objeto que se espera en el arreglo
    Generos: Genero[];
}
