import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, MinLength, Validate, ValidateNested } from "class-validator";
import { validarQueElUuidUsuarioExista } from "src/common/validations/validarQueElUuidUsuarioExista";
import { CreateBateriaCancionDto } from "./create-bateria-cancion.dto";
import { validarQueCancionesNoTengaIdRepetidos } from "../validations/validarQueCancionesNoTengaIdRepetidos";

export class CreateBateriaDto {

    @IsUUID()
    @Validate( validarQueElUuidUsuarioExista )
    UsuarioId: string;
    
    @IsString()
    @MinLength(1)
    Nombre: string;
    
    @IsString()
    @MinLength(1)
    @IsOptional()
    Descripcion?: string;
    
    @IsNumber()
    @IsOptional()
    BPM?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    URL?: string;
    
    //Si se relaciona las canciones
    @IsOptional()
    @IsArray({ message: 'Debe ser un arreglo.'})
    @Type( () => CreateBateriaCancionDto) // Transforma cada objeto a CreateLinkDto
    @ValidateNested({ each: true })
    @Validate( validarQueCancionesNoTengaIdRepetidos )
    Canciones: CreateBateriaCancionDto[];
}