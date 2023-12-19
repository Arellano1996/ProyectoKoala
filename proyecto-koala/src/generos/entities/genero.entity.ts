import { Cancion } from "src/canciones/entities/cancion.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genero
{
    @PrimaryGeneratedColumn('uuid')
    GeneroId: string;

    @Column('text', {
        unique: true
    })
    Nombre: string;

    @ManyToMany( type => Cancion, cancion => cancion.Generos )
    canciones: Cancion[]

}
