import { Body, Controller, Get, Post, Param, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { CreateStudentDto } from 'src/domain/dtos/create-student.dto';
import { Student } from 'src/domain/entities/student.entity';
import { StudentService } from 'src/services/student.service';

@Controller('teacher/:teacherId/student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) { }

    @Post()
    @ApiCreatedResponse({type: Student})        
    async create(
        @Param('teacherId') teacherId: string,
        @Body() createStudentDto: CreateStudentDto
    ) {
        return await this.studentService.create(teacherId, createStudentDto)
    }

    @Get()
    async findAllByTeacher(@Param('teacherId') teacherId: string,) {
        return this.studentService.findAllByTeacher(teacherId)
    }
}


