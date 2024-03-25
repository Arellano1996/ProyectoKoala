import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ConfiguracionesLetra {

    @PrimaryGeneratedColumn('uuid')
    ConfiguracionesLetra: string;

    @Column()
    Comentario: string

}
