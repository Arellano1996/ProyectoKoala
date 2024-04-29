import { ApiProperty } from "@nestjs/swagger";
import { Letra } from "src/letras/entities/letra.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ComentariosLetra {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    ComentariosLetraId: string;

    @ApiProperty()
    @Column()
    Nombre: string;

    @ApiProperty()
    @Column()
    Comentario: string;

    //Muchos comentarios pueden pertenecer a una letra, o bien una letra puede tener muchos comentarios
    @ApiProperty()
    @ManyToOne( type => Letra, letra => letra.Comentarios, {
        onDelete: 'CASCADE'
    })
    Letra: Letra;

}
