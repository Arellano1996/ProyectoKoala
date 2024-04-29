import { ApiProperty } from "@nestjs/swagger";
import { Cancion } from "src/canciones/entities/cancion.entity";
import { formatearSlug } from "src/common/formatear-slug";
import { Letra } from "src/letras/entities/letra.entity";
import { Link } from "src/link/entities/link.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, IsNull, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    UsuarioId: string;

    @ApiProperty()
    @Column('text', {
        unique: true
    })
    Nombre: string;

    @ApiProperty()
    @Column('text', {
        unique: true
    })
    Slug: string;

    @ApiProperty()
    @Column('text', {
        unique: true
    })
    Correo: string;

    @ApiProperty()
    @Column()
    Contrasena: string;

    @ApiProperty()
    @Column({
        nullable: true
    })
    Socios: string;//dev
    
    @ApiProperty()
    @Column({
        nullable: true
    })
    Suscripcion: string;//dev
    
    @ApiProperty()
    @Column({
        nullable: true
    })
    HistorialDonaciones: string;//dev

    @ApiProperty()
    @Column({
        nullable: true
    })
    Referidos: string;//dev

    @ApiProperty()
    @Column({
        nullable: true
    })
    CodigoReferido: string;//dev

    @ApiProperty()
    @Column({
        default: false
    })
    PerfilVerificado: boolean

    @ApiProperty()
    @ManyToMany(type => Cancion, cancion => cancion.CancionId)
    @JoinTable()
    Canciones: Cancion[] | null;

    //Si se usa OneToMany() es obligatorio usar tambien ManyToOne() y @JoinTable() se puede omitir en estas dos relaciones OneToMany y ManyToOne
    //Un usuario puede tener muchos links
    @ApiProperty()
    @OneToMany( type => Link, link => link.Usuario)
    Links: Link[] | null;

    @ApiProperty()
    @OneToMany( type => Letra, link => link.Letra)
    Letras: Letra[] | null;

    @BeforeInsert()
    generarSlug(){
        this.Slug = formatearSlug( this.Nombre )
    }
    
    @BeforeUpdate()
    generarSlugActualizado(){
        this.Slug = formatearSlug( this.Nombre )
    }
}
