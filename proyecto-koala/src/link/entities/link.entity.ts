import { ApiProperty } from "@nestjs/swagger";
import { Cancion } from "src/canciones/entities/cancion.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Link {
    
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    LinkId: string;

    @ApiProperty()
    @Column()
    URL: string;
    
    @ApiProperty()
    @Column({
        nullable: true
    })
    Descripcion: string;

    @ApiProperty()
    @Column({
        nullable: true
    })
    Tono: string;

    @ApiProperty()
    @Column()
    Default: boolean;

    //El link solo puede pertenecer a una canción y a un usuario
    //Muchos links pueden estar asociados a un solo usuario
    @ApiProperty()
    @ManyToOne( type => Usuario, usuario => usuario.Links)
    Usuario: Usuario;

    @ApiProperty()
    @ManyToOne( type => Cancion, cancion => cancion.Links, {
        onDelete: 'CASCADE'
    })
    Cancion: Cancion;
}
