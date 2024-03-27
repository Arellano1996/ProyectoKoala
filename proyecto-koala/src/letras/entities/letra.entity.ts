//#region Imports
import { Cancion } from "src/canciones/entities/cancion.entity";
import { ComentariosLetra } from "src/comentarios-letras/entities/comentarios-letra.entity";
import { ConfiguracionesLetra } from "src/configuraciones-letras/entities/configuraciones-letra.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
//#endregion imports

@Entity()
export class Letra {

    @PrimaryGeneratedColumn('uuid')
    LetraId: string;

    @Column()
    Letra: string;
    
    @Column()
    Acordes: string;

    //Muchas letras diferentes pueden tener una canción, o bien una canción puede tener muchas letras
    @ManyToOne( type => Cancion, cancion => cancion.Letras)
    Cancion: Cancion;
    
    @ManyToOne( type => Usuario, usuario => usuario.Letras)
    Usuario: Usuario;
    
    //Una letra puede tener muchos comentarios distintos, o bien los comentarios solo pueden ir relacionados a una letra
    @OneToMany( type => ComentariosLetra, 
        comentario => comentario.Letra, 
        { cascade: true }
    )
    Comentarios?: ComentariosLetra[];

    @OneToMany( type => ConfiguracionesLetra, configuracionesLetra => configuracionesLetra.Letra, {
        cascade: true
    })
    ConfiguracionesLetra: ConfiguracionesLetra[];
}
