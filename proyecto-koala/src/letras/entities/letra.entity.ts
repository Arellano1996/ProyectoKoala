//#region Imports
import { ApiProperty } from "@nestjs/swagger";
import { Cancion } from "src/canciones/entities/cancion.entity";
import { ComentariosLetra } from "src/comentarios-letras/entities/comentarios-letra.entity";
import { ConfiguracionesLetra } from "src/configuraciones-letras/entities/configuraciones-letra.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
//#endregion imports

@Entity()
export class Letra {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    LetraId: string;

    @ApiProperty()
    @Column()
    Letra: string;
    
    @ApiProperty()
    @Column({
        nullable: true
    })
    Acordes?: string;

    //Muchas letras diferentes pueden tener una canción, o bien una canción puede tener muchas letras
    @ApiProperty()
    @ManyToOne( type => Cancion, cancion => cancion.Letras,{
        onDelete: 'CASCADE'
    })
    Cancion: Cancion;
    
    @ApiProperty()
    @ManyToOne( type => Usuario, usuario => usuario.Letras)
    Usuario: Usuario;
    
    //Una letra puede tener muchos comentarios distintos, o bien los comentarios solo pueden ir relacionados a una letra
    @ApiProperty()
    @OneToMany( type => ComentariosLetra, comentario => comentario.Letra, { cascade: true } )
    Comentarios?: ComentariosLetra[];

    @ApiProperty()
    @OneToMany( type => ConfiguracionesLetra, configuracionesLetra => configuracionesLetra.Letra, { cascade: true } )
    Configuraciones: ConfiguracionesLetra[];
}
