import { Cancion } from "src/canciones/entities/cancion.entity";
import { formatearSlug } from "src/common/formatear-slug";
import { BeforeInsert, BeforeUpdate, Column, Entity, IsNull, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    UsuarioId: string;

    @Column('text', {
        unique: true
    })
    Nombre: string;

    @Column('text', {
        unique: true
    })
    Slug: string;

    @Column('text', {
        unique: true
    })
    Correo: string;

    @Column()
    Contrasena: string;

    @Column({
        nullable: true
    })
    Socios: string;//dev
    
    @Column({
        nullable: true
    })
    Suscripcion: string;//dev
    
    @Column({
        nullable: true
    })
    HistorialDonaciones: string;//dev

    @Column({
        nullable: true
    })
    Referidos: string;//dev

    @Column({
        nullable: true
    })
    CodigoReferido: string;//dev

    @Column({
        default: false
    })
    PerfilVerificado: boolean

    @ManyToMany(type => Cancion, cancion => cancion.CancionId)
    @JoinTable()
    Canciones: Cancion[] | null;

    @BeforeInsert()
    generarSlug(){
        this.Slug = formatearSlug( this.Nombre )
    }
    
    @BeforeUpdate()
    generarSlugActualizado(){
        this.Slug = formatearSlug( this.Nombre )
    }
}
