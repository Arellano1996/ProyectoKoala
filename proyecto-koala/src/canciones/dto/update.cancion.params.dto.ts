import { IsUUID, Validate } from "class-validator";
import { validarSiExisteCancionConstraint } from "../validations/validarSiExisteCancionConstraint";
import { validarSiExisteCancion } from "../validations/validarSiExisteCancion";
import { ApiProperty } from "@nestjs/swagger";

export class updateCancionParamsDto {
    
    @ApiProperty()
    @IsUUID()
    @validarSiExisteCancion()
    id: string
}