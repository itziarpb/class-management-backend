import { DataSource } from "typeorm";
import "reflect-metadata"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "pass",
    database: "my_db",
    synchronize: false,
    logging: false,
    name: "default",
    entities: ["src/domain/entities/**.entity{.ts,.js}"],
    subscribers: [],
    migrations: ['src/database/migrations/*.ts']
})