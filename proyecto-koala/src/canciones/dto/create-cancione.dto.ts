//#region imports
import { Type } from "class-transformer";
import { IsArray, IsInstance, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength, Validate, ValidateNested } from "class-validator";
import { Artista } from "src/artistas/entities/artistas.entity";
import { validarQueElUuidUsuarioExista } from "src/common/validaciones/validarQueElUuidUsuarioExista";
import { Genero } from "src/generos/entities/genero.entity";
import { CreateLinkDto } from "src/link/dto/create-link.dto";
import { Link } from "src/link/entities/link.entity";
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
    @ValidateNested({ each: true }) // Valida cada objeto dentro del array
    @Type(() => CreateLinkDto) // Transforma cada objeto a CreateLinkDto
    Links: CreateLinkDto[];

    // @ManyToMany(type => Usuario, Usuario => Usuario.Canciones)
    // Usuarios: Usuario[];

    @IsArray()
    @IsNotEmpty()
    Artistas: Artista[];

    @IsArray()
    @IsNotEmpty()
    Generos: Genero[];
}
