import { ApiProperty } from "@nestjs/swagger";
import { Cancion } from "src/canciones/entities/cancion.entity";
import { formatearSlug } from "src/common/formatear-slug";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artista
{
    @ApiProperty({
        example: '87399f03-881a-41c7-b239-0557ceabc492',
        description: 'Artista Id',
        uniqueItems: true
    })
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

    @ApiProperty({
        example: 'ariel_camacho',
        description: 'Slug del artista',
        uniqueItems: true
    })
    @Column()
    Slug: string;

    @ApiProperty({
        example: [Cancion],
        description: 'Estas son las canciones que están relacionadas con este Artista'
    })
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
