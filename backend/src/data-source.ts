import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Location } from "./entity/Location"
import { Client } from "./entity/Client"
import { Donation } from "./entity/Donation"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: undefined,
    database: "infrend",
    synchronize: true,
    logging: false,
    entities: [User, Location, Client, Donation],
    migrations: [],
    subscribers: [],
})
