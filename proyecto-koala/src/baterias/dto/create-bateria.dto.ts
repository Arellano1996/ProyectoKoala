import { IsNumber, IsOptional, IsString, IsUUID, MinLength, Validate } from "class-validator";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { validarQueElUuidUsuarioUsuarioIdExista } from "../validations/validarQueElUuidUsuario.UsuarioIdExista";

export class 
CreateBateriaDto {

    @Validate( validarQueElUuidUsuarioUsuarioIdExista )
    Usuario: Usuario;
    
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
    
    // //Si se relaciona las canciones
    // @IsOptional()
    // @IsArray({ message: 'Debe ser un arreglo.'})
    // @Type( () => CreateBateriaCancionDto) // Transforma cada objeto a CreateLinkDto
    // @ValidateNested({ each: true })
    // @Validate( validarQueCancionesNoTengaIdRepetidos )
    // Canciones: CreateBateriaCancionDto[];

}
