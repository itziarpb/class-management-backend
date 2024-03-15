import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { GradeEnum } from "../enums/grade.enum";

export class CreateStudentDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(GradeEnum)
    @IsNotEmpty()
    grade: GradeEnum;
}