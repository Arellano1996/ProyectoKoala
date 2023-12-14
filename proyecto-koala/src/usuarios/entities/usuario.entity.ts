import { Cancion } from "src/canciones/entities/cancione.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    UsuarioId: string;

    @Column()
    Nombre: string;

    @Column()
    Correo: string;

    @Column()
    Contrasena: string;

    @ManyToMany(type => Cancion)
    @JoinTable()
    Repertorio: Cancion[];

    @Column()
    SociosDEV: string;

    @Column()
    SuscripcionDEV: string;
    
    @Column()
    HistorialDonacionesDEV: string;

}
