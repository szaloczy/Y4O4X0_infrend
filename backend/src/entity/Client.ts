import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GenderType } from "../types";
import { Donation } from "./Donation";

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

    @Column({ type: 'date'})
    date_of_birth: Date;

    @Column()
    citizenship: string;

    @Column()
    address: string;

    @Column({ unique:true })
    taj_number: number;

    @OneToMany(() => Donation, donation => donation.client)
    donations: Donation[];
}