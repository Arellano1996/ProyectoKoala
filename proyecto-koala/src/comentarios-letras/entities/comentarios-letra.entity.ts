import { Letra } from "src/letras/entities/letra.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ComentariosLetra {

    @PrimaryGeneratedColumn('uuid')
    ComentariosLetraId: string;

    @Column()
    Nombre: string;

    @Column()
    Comentario: string;

    //Muchos comentarios pueden pertenecer a una letra, o bien una letra puede tener muchos comentarios
    @ManyToOne( type => Letra, letra => letra.Comentarios, {
        onDelete: 'CASCADE'
    })
    Letra: Letra;

}
