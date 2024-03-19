import { Cancion } from "src/canciones/entities/cancion.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Link {
    
    @PrimaryGeneratedColumn('uuid')
    LinkId: string;

    @Column()
    URL: string;
    
    @Column({
        nullable: true
    })
    Descripcion: string;

    @Column({
        nullable: true
    })
    Tono: string;

    @Column()
    Default: boolean;

    //El link solo puede pertenecer a una canción y a un usuario
    //Muchos links pueden estar asociados a un solo usuario
    @ManyToOne( type => Usuario, usuario => usuario.Links)
    Usuario: Usuario;

    @ManyToOne( type => Cancion, cancion => cancion.Links)
    Cancion: Cancion;
}
