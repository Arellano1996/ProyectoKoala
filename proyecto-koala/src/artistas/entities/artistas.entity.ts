import { Cancion } from "src/canciones/entities/cancion.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artista
{
    @PrimaryGeneratedColumn('uuid')
    ArtistaId: string;

    @Column('text', {
        unique: true
    })
    Nombre: string;

    @ManyToMany( type => Cancion, cancion => cancion.Artistas)
    Canciones: Cancion[]
}
