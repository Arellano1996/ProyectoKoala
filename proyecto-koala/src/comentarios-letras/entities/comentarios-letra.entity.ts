import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ComentariosLetra {

    @PrimaryGeneratedColumn('uuid')
    ComentariosLetraId: string;

    @Column()
    ConfiguracionJSON: string;

}
