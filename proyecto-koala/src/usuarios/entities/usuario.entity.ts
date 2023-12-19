import { Cancion } from "src/canciones/entities/cancion.entity";
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

    @Column()
    DevSocios: string;
    
    @Column()
    DevSuscripcion: string;
    
    @Column()
    DevHistorialDonaciones: string;

    // @ManyToMany(type => Cancion)
    // @JoinTable()
    // Canciones: Cancion[];

}
