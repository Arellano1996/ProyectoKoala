//#region imports
import { Artista } from "src/artistas/entities/artistas.entity";
import { formatearSlug } from "src/common/formatear-slug";
import { Genero } from "src/generos/entities/genero.entity";
import { Link } from "src/link/entities/link.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
//#endregion imports

@Entity()
export class Cancion {

    @PrimaryGeneratedColumn('uuid')
    CancionId: string;
    
    @Column()
    UsuarioId: string;
    
    @Column()
    Nombre: string;
    
    @Column()
    Slug: string;
    
    @Column({
        nullable: true
    })
    Tono?: string;

    @Column({
        nullable: true
    })
    Acordes?: string;

    @Column({
        nullable: true
    })
    Letra?: string;

    @OneToMany( type => Link, link => link.Cancion)
    Links: Link[];

    @ManyToMany( type => Artista, Artista => Artista.ArtistaId, {
        cascade: true
    } )
    @JoinTable()
    Artistas: Artista[];

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
