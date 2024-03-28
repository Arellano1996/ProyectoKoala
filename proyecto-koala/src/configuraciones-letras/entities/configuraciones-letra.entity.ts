import { Letra } from "src/letras/entities/letra.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ConfiguracionesLetra {

    @PrimaryGeneratedColumn('uuid')
    ConfiguracionesLetraId: string;

    @Column()
    ConfiguracionJSON: string;

    //Muchas configuraciones pueden pertenecer a una misma letra, o bien una letra puede tener muchas configuraciones
    @ManyToOne( type => Letra, letra => letra.ConfiguracionesLetra, {
        onDelete: 'CASCADE'
    })
    Letra: Letra;

}
