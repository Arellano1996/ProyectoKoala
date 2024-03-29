import { IsOptional, IsUUID } from 'class-validator';
import { validarSiExisteCancionDesdeLetra } from '../validations/validarSiExisteCancionDesdeLetra';
import { validarSiExisteUsuarioDesdeLetra } from '../validations/validarSiExisteUsuarioDesdeLetra';

export class FindLetraDto {

    @IsUUID()
    @validarSiExisteUsuarioDesdeLetra()
    @IsOptional()
    UsuarioId: string;
    
    @IsUUID()
    @validarSiExisteCancionDesdeLetra()
    @IsOptional()
    CancionId: string;
}
