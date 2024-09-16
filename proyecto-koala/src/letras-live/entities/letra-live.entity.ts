import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LetraLive {

    @PrimaryGeneratedColumn('uuid')
    LetraLiveId: string;

    @Column()
    UsuarioId: string;

    @Column()
    LetraId: string;

    @Column()
    Tono: number
    
    @Column({
        nullable: true
    })
    ConfiguracionId?: string;
    
}