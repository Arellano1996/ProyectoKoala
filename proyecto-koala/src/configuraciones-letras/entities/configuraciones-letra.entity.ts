import { ApiProperty } from "@nestjs/swagger";
import { Letra } from "src/letras/entities/letra.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ConfiguracionesLetra {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    ConfiguracionesLetraId: string;

    @ApiProperty()
    @Column()
    Nombre: string;

    @ApiProperty()
    @Column()
    ConfiguracionJSON: string;

    //Muchas configuraciones pueden pertenecer a una misma letra, o bien una letra puede tener muchas configuraciones
    @ApiProperty()
    @ManyToOne( type => Letra, letra => letra.Configuraciones, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    Letra: Letra;

}
