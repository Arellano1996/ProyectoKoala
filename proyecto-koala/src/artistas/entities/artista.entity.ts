import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artista 
{
    @PrimaryGeneratedColumn('uuid')
    ArtistaId: string;

    @Column()
    Nombre: string;
}
