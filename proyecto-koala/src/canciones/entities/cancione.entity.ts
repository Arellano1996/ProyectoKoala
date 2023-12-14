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

    @ManyToMany(type => Usuario, Usuario => Usuario.Repertorio)
    Usuarios: Usuario[];
}
