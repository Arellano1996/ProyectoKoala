import { ApiProperty } from "@nestjs/swagger";
import { Cancion } from "src/canciones/entities/cancion.entity";
import { formatearSlug } from "src/common/formatear-slug";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genero
{
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    GeneroId: string;

    @ApiProperty()
    @Column('text', {
        unique: true
    })
    Nombre: string;

    @ApiProperty()
    @Column()
    Slug: string;

    @ApiProperty()
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
