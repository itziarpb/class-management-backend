import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CreateStudentDto } from 'src/domain/dtos/create-student.dto';
import { StudentService } from 'src/services/student.service';

@Controller()
export class StudentController {

    constructor(
        private readonly studentService: StudentService
    ) { }

    @Post('teacher/:teacherId/student')
    async create(
        @Param('teacherId') teacherId: string,
        @Body() createStudentDto: CreateStudentDto
    ) {
        return await this.studentService.create(teacherId, createStudentDto)
    }

    @Get('teacher/:teacherId/student')
    async findAllByTeacher(@Param('teacherId') teacherId: string,) {
        return this.studentService.findAllByTeacher(teacherId)
    }
}

