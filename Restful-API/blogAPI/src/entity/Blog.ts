import {

    Column,

    Entity,

    PrimaryGeneratedColumn,


} from "typeorm";

@Entity()

export class Blog {

    @PrimaryGeneratedColumn()
    public id: number;


    @Column({ type: "varchar" })

    public title: string;



    @Column({ type: "varchar" })

    public text: string;

}