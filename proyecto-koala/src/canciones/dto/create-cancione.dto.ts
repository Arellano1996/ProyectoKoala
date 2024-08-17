//#region imports
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength, Validate, ValidateNested } from "class-validator";
import { Artista } from "src/artistas/entities/artistas.entity";
import { validarQueElUuidUsuarioExista } from "src/common/validations/validarQueElUuidUsuarioExista";
import { Genero } from "src/generos/entities/genero.entity";
import { CreateCancioneLinkDto } from "./create-cancion-link.dto";
import { validarQueLosURLNoEstenRepetidos } from "src/common/validations/validarQueLosURLNoEstenRepetidos";
import { siNoHayLinkDefaultEstablecerElPrimerLinkComoDefault } from "src/common/validations/siNoHayLinkDefaultEstablecerElPrimerLinkComoDefault";
import { asignarUsuarioParaCancionLink } from "src/common/validations/asignarUsuarioParaCancionLink";
import { CreateCancioneLetraDto } from "./create-cancion-letra.dto";
import { asignarUsuarioParaCancionLetra } from "src/common/validations/asignarUsuarioParaCancionLetra";
import { CreateCancionBateriaDto } from "./create-cancion-bateria.dto";
import { asignarUsuarioParaCancionBateria } from "../validations/asignarUsuarioParaCancionBateria";
import { IsNull } from "typeorm";
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
    @IsOptional()
    BPM?: string;
    
    @IsString()
    @MinLength(1)
    @IsOptional()
    Duracion?: string;
    
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
    
    @IsOptional()
    @IsArray()
    @IsNotEmpty()
    @Validate( asignarUsuarioParaCancionBateria )
    Baterias: CreateCancionBateriaDto[];
}
