import { IsString, MinLength } from "class-validator";

export class CreateGeneroDto {

    @IsString()
    @MinLength(1)
    Nombre: string;
    
}
