import { DataSource } from "typeorm";
import { Lesson } from "../domain/entities/lesson.entity";
import { Student } from "../domain/entities/student.entity";
import { Teacher } from "../domain/entities/teacher.entity";

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
    entities: ["src/entities/**.entity{.ts,.js}"],
    subscribers: [],
    migrations: ['src/database/migrations/*.ts']
})