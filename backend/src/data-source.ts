import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Location } from "./entity/Location";
import { Client } from "./entity/Client";
import { Donation } from "./entity/Donation";
import { dbHost, dbPort } from "./config/config";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: dbHost || "localhost",
    port: dbPort as number || 3306,
    username: "root",
    password: undefined,
    database: "infrend",
    synchronize: true,
    logging: false,
    entities: [User, Location, Client, Donation],
    migrations: [],
    subscribers: [],
})
