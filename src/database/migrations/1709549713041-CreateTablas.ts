import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablas1709549713041 implements MigrationInterface {
    name = 'CreateTablas1709549713041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "teacherId" uuid, CONSTRAINT "REL_d841b74fd2e92061b15c20d4ea" UNIQUE ("teacherId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "REL_4f596730e16ee49d9b081b5d8e" UNIQUE ("userId"), CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."student_grade_enum" AS ENUM('1Bach', '2Bach', '1ESO', '2ESO', '3ESO', '4ESO')`);
        await queryRunner.query(`CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grade" "public"."student_grade_enum" NOT NULL, "teacherId" uuid, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."lesson_task_enum" AS ENUM('No', 'Pending', 'Correct')`);
        await queryRunner.query(`CREATE TABLE "lesson" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "date" character varying NOT NULL, "duration" character varying NOT NULL DEFAULT '01:00', "done" boolean NOT NULL DEFAULT false, "task" "public"."lesson_task_enum" NOT NULL DEFAULT 'No', "price" integer NOT NULL, "payment" boolean NOT NULL DEFAULT false, "studentId" uuid, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d841b74fd2e92061b15c20d4eaa" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_4f596730e16ee49d9b081b5d8e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_f4481746c56ffa6cf77829a4bcc" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_a67245be78e8fc70268144d64b5" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_a67245be78e8fc70268144d64b5"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_f4481746c56ffa6cf77829a4bcc"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_4f596730e16ee49d9b081b5d8e5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d841b74fd2e92061b15c20d4eaa"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP TYPE "public"."lesson_task_enum"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TYPE "public"."student_grade_enum"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
