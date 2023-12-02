import { IsEmail, IsEnum, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { GradeEnum } from "../enums/grade.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsPositive()
    price: number;

    @IsEnum(GradeEnum)
    @ApiProperty({
        type: GradeEnum,
        required: true
    })
    grade: GradeEnum;
}