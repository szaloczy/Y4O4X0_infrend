import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Location } from "./Location";

@Entity()
export class Donation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    date: Date;

    @Column()
    eligible: boolean;

    @Column({ nullable: true })
    reason: string;

    @Column()
    doctor: string;

    @Column()
    controlled: boolean;

    @Column({ nullable: true })
    patient_fullname: string;
    
    @Column({ nullable: true })
    patient_taj: number;

    @ManyToOne(() => Client, client => client.donations, { eager: true})
    client: Client;

    @ManyToOne(() => Location, location => location.donations, { eager: true })
    location: Location;
}