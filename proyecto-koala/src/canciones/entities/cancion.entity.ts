import { Artista } from "src/artistas/entities/artistas.entity";
import { formatearSlug } from "src/common/formatear-slug";
import { Genero } from "src/generos/entities/genero.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cancion {

    @PrimaryGeneratedColumn('uuid')
    CancionId: string;
    
    @Column()
    Creador: string;
    
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

    @Column({
        nullable: true
    })
    Link?: string;

    // @ManyToMany(type => Usuario, Usuario => Usuario.Canciones)
    // Usuarios: Usuario[];

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

}
