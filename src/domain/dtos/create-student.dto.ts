import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { GradeEnum } from "../enums/grade.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(GradeEnum)
    @ApiProperty({
        type: GradeEnum,
        required: true
    })
    grade: GradeEnum;
}