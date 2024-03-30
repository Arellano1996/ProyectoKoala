import { IsUUID } from 'class-validator';
import { ValidarSiExisteComentario } from '../validations/validarSiExisteComentario';

export class UpdateComentariosLetraParamsDto {

    @IsUUID()
    @ValidarSiExisteComentario()
    id: string;
}
