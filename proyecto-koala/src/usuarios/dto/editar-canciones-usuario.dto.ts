//#region imports
import { IsArray, IsOptional, IsUUID, Validate, ValidateIf, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Cancion } from 'src/canciones/entities/cancion.entity';
import { validarQueSoloUnaListaTengaElementos } from 'src/common/validaciones/validarQueSoloUnaListaTengaElementos';
//#endregion imports

export class EditarCancionesUsuarioDto{
    
    @IsUUID()
    @Validate( validarQueSoloUnaListaTengaElementos, ['AgergarCanciones', 'EliminarCanciones'] )
    UsuarioId: string;
    
    @IsArray()
    @IsOptional()
    AgergarCanciones: string[];
    
    @IsArray()
    @IsOptional()
    EliminarCanciones: string[];

}


