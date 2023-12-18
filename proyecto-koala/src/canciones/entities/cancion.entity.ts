import { Artista } from "src/artistas/entities/artistas.entity";
import { Genero } from "src/generos/entities/genero.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cancion {

    @PrimaryGeneratedColumn('uuid')
    CancionId: string;
    
    @Column()
    Creador: string;

    @Column('text',{
        unique: true
    })
    Nombre: string;
    
    @Column()
    Tono: string;

    @Column()
    Acordes: string;

    @Column()
    Letra: string;

    @Column()
    Link: string;

    @ManyToMany(type => Usuario, Usuario => Usuario.Canciones)
    Usuarios: Usuario[];

    @ManyToMany(type => Artista, Artista => Artista.ArtistaId )
    Artistas: Artista[];

    @ManyToMany(type => Genero, Genero => Genero.GeneroId)
    Generos: Genero[];

}
