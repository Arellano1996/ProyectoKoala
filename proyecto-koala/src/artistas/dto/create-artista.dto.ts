import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateArtistaDto {
    
    @IsString()
    @MinLength(1)
    Nombre: string;
}
