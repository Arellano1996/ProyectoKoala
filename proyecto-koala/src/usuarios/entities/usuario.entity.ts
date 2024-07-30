import { Bateria } from "src/baterias/entities/bateria.entity";
import { Cancion } from "src/canciones/entities/cancion.entity";
import { formatearSlug } from "src/common/formatear-slug";
import { Letra } from "src/letras/entities/letra.entity";
import { Link } from "src/link/entities/link.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, IsNull, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    //Si se usa OneToMany() es obligatorio usar tambien ManyToOne() y @JoinTable() se puede omitir en estas dos relaciones OneToMany y ManyToOne
    //Un usuario puede tener muchos links
    @OneToMany( type => Link, link => link.Usuario)
    Links: Link[] | null;
    
    @OneToMany( type => Letra, letra => letra.Usuario)
    Letras: Letra[] | null;
    
    //Un usuario puede tener muchas baterias
    //Si se usa OneToMany() es obligatorio usar tambien ManyToOne() 
    //@JoinTable() se puede omitir en estas dos relaciones 
    //OneToMany y ManyToOne
    @OneToMany( type => Bateria, bateria => bateria.Usuario)
    Baterias: Bateria[];
    

    @BeforeInsert()
    generarSlug(){
        this.Slug = formatearSlug( this.Nombre )
        this.Correo = this.Correo.toLocaleLowerCase().trim()
    }
    
    @BeforeUpdate()
    generarSlugActualizado(){
        this.Slug = formatearSlug( this.Nombre )
        this.Correo = this.Correo.toLocaleLowerCase().trim()
    }
}
