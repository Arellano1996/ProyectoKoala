import { IsString, IsUUID } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Letra {

    @PrimaryGeneratedColumn('uuid')
    LetraId: string;

    @Column()
    Letra: string;
    
    @Column()
    Acordes: string;
    
    @Column()
    ConfiguracionesLetra: string;
    
    @Column()
    Comentarios: string;

}
