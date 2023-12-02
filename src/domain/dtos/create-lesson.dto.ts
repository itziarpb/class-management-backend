import { IsEnum, IsString } from "class-validator";
import { TaskEnum } from "../enums/task.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLessonDto {
    date: string;

    @IsString()
    description: string;

    @IsEnum(TaskEnum)
    @ApiProperty({
        type: TaskEnum,
    })
    task: TaskEnum;
}