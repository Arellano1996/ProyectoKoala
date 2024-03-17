import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Link {
    @PrimaryGeneratedColumn('uuid')
    LinkId: string;

    @Column()
    URL: string;
    
    @Column()
    Descripcion: string;

    @Column()
    Tono: string;
}
