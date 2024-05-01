import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID, IsUrl } from "class-validator";
import { Link } from "src/link/entities/link.entity";
import { validarSiExisteLink } from "src/link/validations/validarSiExisteLink";

export class UpdateCancioneLinkDto{
    
    @ApiProperty()
    @IsUUID()
    @IsOptional()
    @validarSiExisteLink()
    LinkId: string;
    
    @ApiProperty()
    @IsUrl()
    URL: string;
    
    @ApiProperty()
    @IsOptional()
    Descripcion: string;
    
    @ApiProperty()
    @IsOptional()
    Tono: string;
    
    @ApiProperty()
    @IsOptional()
    Default: boolean = false;

    //Relaciones

    //Usuario se relaciona al momento de validar
}
