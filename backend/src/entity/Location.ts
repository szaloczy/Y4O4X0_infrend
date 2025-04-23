import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Donation } from "./Donation";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    active: boolean;

    @OneToMany(() => Donation, donation => donation.location)
    donations: Donation[];
}