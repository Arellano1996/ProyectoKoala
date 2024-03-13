import { Cancion } from "src/canciones/entities/cancion.entity";
import { formatearSlug } from "src/common/formatear-slug";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genero
{
    @PrimaryGeneratedColumn('uuid')
    GeneroId: string;

    @Column('text', {
        unique: true
    })
    Nombre: string;

    @Column()
    Slug: string;

    @ManyToMany( type => Cancion, cancion => cancion.Generos )
    canciones: Cancion[]

    @BeforeInsert()
    generarSlug(){
        this.Slug = formatearSlug( this.Nombre )
    }

    @BeforeUpdate()
    generarSlugActualizado(){
        this.Slug = formatearSlug( this.Nombre )
    }

}
