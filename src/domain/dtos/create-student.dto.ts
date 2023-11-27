import { GradeEnum } from "../enums/grade.enum";

export class CreateStudentDto {
    name: string;
    grade: GradeEnum;
}