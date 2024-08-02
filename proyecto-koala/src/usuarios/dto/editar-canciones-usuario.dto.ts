//#region imports
import { IsArray, IsOptional, IsUUID, Validate, ValidateIf, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Cancion } from 'src/canciones/entities/cancion.entity';
import { validarQueElUuidUsuarioExista } from 'src/common/validations/validarQueElUuidUsuarioExista';
import { validarQueSoloUnaListaTengaElementos } from 'src/common/validations/validarQueSoloUnaListaTengaElementos';
//#endregion imports

export class EditarCancionesUsuarioDto{
    
    @IsUUID()
    @Validate( validarQueSoloUnaListaTengaElementos, ['AgergarCanciones', 'EliminarCanciones'] )
    @Validate( validarQueElUuidUsuarioExista )
    UsuarioId: string;
    
    @IsArray()
    @IsOptional()
    AgergarCanciones: string[];
    
    @IsArray()
    @IsOptional()
    EliminarCanciones: string[];

}


