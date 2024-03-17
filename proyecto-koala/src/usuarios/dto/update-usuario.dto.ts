import { Cancion } from 'src/canciones/entities/cancion.entity';
import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCancioneDto } from 'src/canciones/dto/create-cancione.dto';

export class UpdateUsuarioDto {
    
    @IsUUID()
    UsuarioId: string;

    @IsOptional()
    Nombre: string;

    @IsOptional()
    Correo: string;
    
    @IsOptional()
    Contrasena: string;

}
