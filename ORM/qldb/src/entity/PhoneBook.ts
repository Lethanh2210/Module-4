import {

    Column,

    Entity,

    PrimaryGeneratedColumn,

} from "typeorm";




@Entity()

export class PhoneBook {

    @PrimaryGeneratedColumn()

    public readonly id: number;



    @Column()

    public name: string;



    @Column({ type: "varchar" })

    public address: string;



    @Column({ type: "varchar" })

    public email: string;



    @Column({ type: "varchar" })

    public phone: string;


    @Column({ type: "varchar" })

    public note: string;



    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })

    public created_at: string;



    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })

    public updated_at: string;

}