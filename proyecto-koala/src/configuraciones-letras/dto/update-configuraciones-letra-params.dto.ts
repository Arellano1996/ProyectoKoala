import { IsUUID } from 'class-validator';
import { ValidarSiExisteConfiguracion } from '../validations/validarSiExisteConfiguracion';

export class UpdateConfiguracionesLetraParamsDto {

    @IsUUID()
    @ValidarSiExisteConfiguracion()
    id: string;
}
