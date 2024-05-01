//#region imports
import { ApiProperty } from "@nestjs/swagger";
import { Artista } from "src/artistas/entities/artistas.entity";
import { formatearSlug } from "src/common/formatear-slug";
import { Genero } from "src/generos/entities/genero.entity";
import { Letra } from "src/letras/entities/letra.entity";
import { Link } from "src/link/entities/link.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
//#endregion imports

@Entity()
export class Cancion {

    @ApiProperty({
        example: '87399f03-881a-41c7-b239-0557ceabc492',
        description: 'Cancion Id',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    CancionId: string;
    
    @ApiProperty({
        example: '87399f03-881a-41c7-b239-0557ceabc492',
        description: 'Id del usuario que creo la canción',
        uniqueItems: true
    })
    @Column()
    UsuarioId: string;
    
    @ApiProperty({
        example: 'Total ya se fue',
        description: 'Nombre de la canción',
        uniqueItems: true
    })
    @Column()
    Nombre: string;
    
    @ApiProperty()
    @Column()
    Slug: string;

    @ApiProperty()
    @Column({
        nullable: true
    })
    Tono?: string;

    @ApiProperty()
    @OneToMany( type => Letra, letra => letra.Cancion, {
        cascade: true
    })
    Letras: Letra[];

    @ApiProperty()
    @OneToMany( type => Link, link => link.Cancion, {
        cascade: true
    })
    Links: Link[];

    @ApiProperty()
    @ManyToMany( type => Artista, Artista => Artista.ArtistaId, {
        cascade: true
    } )
    @JoinTable()
    Artistas: Artista[];

    @ApiProperty()
    @ManyToMany( type => Genero, Genero => Genero.GeneroId, {
        cascade: true
    })
    @JoinTable()
    Generos: Genero[];

    @BeforeInsert()
    generarSlug(){
        this.Slug = formatearSlug( this.Nombre )
    }
    
    @BeforeUpdate()
    generarSlugActualizado(){
        this.Slug = formatearSlug( this.Nombre )
    }

}
