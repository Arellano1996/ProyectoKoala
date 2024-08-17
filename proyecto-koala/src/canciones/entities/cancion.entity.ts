//#region imports
import { Artista } from "src/artistas/entities/artistas.entity";
import { Bateria } from "src/baterias/entities/bateria.entity";
import { formatearSlug } from "src/common/formatear-slug";
import { Genero } from "src/generos/entities/genero.entity";
import { Letra } from "src/letras/entities/letra.entity";
import { Link } from "src/link/entities/link.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
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
        nullable: true,
    })
    BPM?: string;
    
    @Column({
        nullable: true
    })
    Duracion?: string;

    // @Column({
    //     nullable: true
    // })
    // Acordes?: string;

    @OneToMany( type => Letra, letra => letra.Cancion, {
        cascade: true
    })
    Letras: Letra[];

    @OneToMany( type => Link, link => link.Cancion, {
        cascade: true
    })
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
    
    @ManyToMany( type => Bateria, {
        cascade: true
    })
    @JoinTable()
    Baterias: Bateria[];

    @ManyToMany(type => Usuario, usuario => usuario.Canciones)
    @JoinTable()
    Usuarios: Usuario[] | null;

    @BeforeInsert()
    generarSlug(){
        this.Slug = formatearSlug( this.Nombre )
    }
    
    @BeforeUpdate()
    generarSlugActualizado(){
        this.Slug = formatearSlug( this.Nombre )
    }

}
