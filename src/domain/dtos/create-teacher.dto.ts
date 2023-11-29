import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTeacherDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password:string;
}


