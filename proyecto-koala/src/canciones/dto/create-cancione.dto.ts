//#region imports
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength, Validate, ValidateNested } from "class-validator";
import { Artista } from "src/artistas/entities/artistas.entity";
import { validarQueElUuidUsuarioExista } from "src/common/validaciones/validarQueElUuidUsuarioExista";
import { Genero } from "src/generos/entities/genero.entity";
import { CreateCancioneLinkDto } from "./crear-cancion-link.dto";
import { validarQueLosURLNoEstenRepetidos } from "src/common/validaciones/validarQueLosURLNoEstenRepetidos";
import { siNoHayLinkDefaultEstablecerElPrimerLinkComoDefault } from "src/common/validaciones/siNoHayLinkDefaultEstablecerElPrimerLinkComoDefault";
import { Letra } from "src/letras/entities/letra.entity";
import { asignarUsuarioParaCancionLink } from "src/common/validaciones/asignarUsuarioParaCancionLink";
import { CreateCancioneLetraDto } from "./crear-cancion-letra.dto";
import { asignarUsuarioParaCancionLetra } from "src/common/validaciones/asignarUsuarioParaCancionLetra";
//#endregion imports

export class CreateCancioneDto {
    
    @IsUUID()
    @Validate( validarQueElUuidUsuarioExista )
    UsuarioId: string;
    
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
    
    //Relaciones

    @IsOptional()
    @Type(() => CreateCancioneLetraDto) // Transforma cada objeto al objeto especificado
    @ValidateNested({ each: true })
    @Validate( asignarUsuarioParaCancionLetra )
    Letras: CreateCancioneLetraDto[];
    
    @IsOptional()
    @Type(() => CreateCancioneLinkDto) // Transforma cada objeto a CreateLinkDto
    @ValidateNested({ each: true })
    @Validate( validarQueLosURLNoEstenRepetidos )
    @Validate( siNoHayLinkDefaultEstablecerElPrimerLinkComoDefault )
    @Validate( asignarUsuarioParaCancionLink )
    Links: CreateCancioneLinkDto[];

    @IsArray()
    @IsNotEmpty()
    Artistas: Artista[];

    @IsArray()
    @IsNotEmpty()
    Generos: Genero[];
}
