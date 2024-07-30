import { Cancion } from "src/canciones/entities/cancion.entity";
import { Genero } from "src/generos/entities/genero.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bateria {
    @PrimaryGeneratedColumn('uuid')
    BateriaId: string;
    
    @Column({
        nullable: true
    })
    Nombre?: string;
    
    @Column({
        nullable: true
    })
    Descripcion?: string;
    
    @Column({
        nullable: true
    })
    BPM?: string;

    @Column({
        nullable: true
    })
    URL?: string;
    //La bateria solo puede pertenecer a una canción y a un usuario
    //Muchas baterias pertenecen a un solo usuario
    @ManyToOne( type => Usuario, usuario => usuario.Baterias)
    Usuario: Usuario;
    
}
