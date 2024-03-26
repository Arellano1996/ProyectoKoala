//#region imports
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength, Validate, ValidateNested } from "class-validator";
import { Artista } from "src/artistas/entities/artistas.entity";
import { validarQueElUuidUsuarioExista } from "src/common/validaciones/validarQueElUuidUsuarioExista";
import { Genero } from "src/generos/entities/genero.entity";
import { CreateCancioneLinkDto } from "./crear-cancion-link.dto";
import { validarQueLosLinksSeAsignenAlMismoUsuarioQueEstaCreandoLaCancion } from "src/common/validaciones/validarQueLosLinksSeAsignenAlMismoUsuarioQueEstaCreandoLaCancion";
import { validarQueLosURLNoEstenRepetidos } from "src/common/validaciones/validarQueLosURLNoEstenRepetidos";
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
    
    @IsString()
    @MinLength(1)
    @IsOptional()
    Letra?: string;
    
    @IsOptional()
    @Type(() => CreateCancioneLinkDto) // Transforma cada objeto a CreateLinkDto
    @Validate( validarQueLosLinksSeAsignenAlMismoUsuarioQueEstaCreandoLaCancion )
    @Validate( validarQueLosURLNoEstenRepetidos )
    Links: CreateCancioneLinkDto[];
    
    // @ManyToMany(type => Usuario, Usuario => Usuario.Canciones)
    // Usuarios: Usuario[];

    @IsArray()
    @IsNotEmpty()
    Artistas: Artista[];

    @IsArray()
    @IsNotEmpty()
    Generos: Genero[];
}
