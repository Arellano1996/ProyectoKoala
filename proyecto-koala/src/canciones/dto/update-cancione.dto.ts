//#region Imports
import { IsArray, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from 'class-validator';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { Type } from 'class-transformer';
import { Genero } from 'src/generos/entities/genero.entity';
import { CreateArtistaDto } from 'src/artistas/dto/create-artista.dto';
import { CreateGeneroDto } from 'src/generos/dto/create-genero.dto';
import { Cancion } from '../entities/cancion.entity';
import { Bateria } from 'src/baterias/entities/bateria.entity';
import { CreateBateriaDto } from 'src/baterias/dto/create-bateria.dto';
//#endregion Imports

export class UpdateCancioneDto {

    Cancion: Cancion;
    
    @IsUUID()
    CancionId: string;

    @IsString({ message: 'Nombre debe ser tipo string.'})
    @MinLength(1,{ message: 'Nombre debe tener al menos 1 caracter.'})
    // @IsNotEmpty({ message: 'Nombre es obligatorio.'})
    @IsOptional()
    Nombre: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Duracion?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    BPM?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Tono?: string;


    // @IsOptional()
    // @Type(() => UpdateLetraDto) // Transforma cada objeto al objeto especificado
    // @ValidateNested({ each: true })
    // Letras: UpdateLetraDto[] = [];

    // @IsOptional()
    // @Type(() => UpdateCancioneLinkDto) // Transforma cada objeto a CreateLinkDto
    // @ValidateNested({ each: true })
    // Links: UpdateCancioneLinkDto[] = [];

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

    @IsArray({ message: 'Debe ser un arreglo.'})
    // @ArrayMinSize(1, { message: 'Debe haber al menos un genero.' })
    @ValidateNested({ each: true }) // Validar cada objeto del arreglo
    @Type(() => CreateBateriaDto) // Tipo del objeto que se espera en el arreglo
    Baterias: Bateria[] = [];
}
