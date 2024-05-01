import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUrl } from "class-validator";

export class CreateCancioneLinkDto{
    
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
