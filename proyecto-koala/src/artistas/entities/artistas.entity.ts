import { ApiProperty } from "@nestjs/swagger";
import { Cancion } from "src/canciones/entities/cancion.entity";
import { formatearSlug } from "src/common/formatear-slug";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artista
{
    @PrimaryGeneratedColumn('uuid')
    ArtistaId: string;

    @ApiProperty({
        example: 'Ariel Camacho',
        description: 'Nombre del artista',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    Nombre: string;

    @Column()
    Slug: string;

    @ManyToMany( type => Cancion, cancion => cancion.Artistas)
    Canciones: Cancion[]

    @BeforeInsert()
    generarSlug(){
        this.Slug = formatearSlug( this.Nombre )
    }

    @BeforeUpdate()
    generarSlugActualizado(){
        this.Slug = formatearSlug( this.Nombre )
    }
    
}
