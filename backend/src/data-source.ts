import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Location } from "./entity/Location"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: undefined,
    database: "infrend",
    synchronize: true,
    logging: false,
    entities: [User, Location],
    migrations: [],
    subscribers: [],
})
