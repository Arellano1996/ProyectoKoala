import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, MinLength, Validate, ValidateNested } from "class-validator";
import { CreateBateriaCancionDto } from "src/baterias/dto/create-bateria-cancion.dto";
import { validarQueCancionesNoTengaIdRepetidos } from "src/baterias/validations/validarQueCancionesNoTengaIdRepetidos";

export class CreateCancionBateriaDto {
    
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
