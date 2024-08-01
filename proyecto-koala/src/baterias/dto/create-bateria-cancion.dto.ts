import { IsUUID, MinLength, Validate } from "class-validator";
import { validarQueExisteCancion } from "../validations/validarQueExisteCancion";

export class CreateBateriaCancionDto {
    //Los objetos tipo Cancion, que recibo al crear una bateria
    //solo deben tener CancionId para corroborar que la cancion exista
    @Validate( validarQueExisteCancion )
    CancionId: string
}