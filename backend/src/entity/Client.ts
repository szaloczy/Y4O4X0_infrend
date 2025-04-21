import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenderType } from "../types";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column({
        type: "enum",
        enum: GenderType,
        default: GenderType.MALE
    })
    gender: GenderType;

    @Column()
    birthplace: string;

    @Column()
    date_of_birth: Date;

    @Column()
    citizenship: string;

    @Column()
    address: string;

    @Column({ unique:true })
    taj_number: number;
}