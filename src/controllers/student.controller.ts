import { Body, Controller, Get, Post, Param, ValidationPipe, Delete, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateStudentDto } from 'src/domain/dtos/create-student.dto';
import { Student } from 'src/domain/entities/student.entity';
import { StudentService } from 'src/services/student.service';

@Controller('teacher/:teacherId/student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) { }

    //Create new Student
    @UseGuards(AuthGuard)
    @Post()
    @ApiCreatedResponse({type: Student})        
    async create(
        @Param('teacherId') teacherId: string,
        @Body() createStudentDto: CreateStudentDto
    ) {
        return await this.studentService.create(teacherId, createStudentDto)
    }

    //Get all student (from a Teacher)
    @UseGuards(AuthGuard)
    @Get()
    async findAllByTeacher(@Param('teacherId') teacherId: string,) {
        return this.studentService.findAllByTeacher(teacherId)
    }

    //Get one student (from a Teacher)
    @UseGuards(AuthGuard)
    @Get('/:studentId')
    async findOneStudent(
        @Param('teacherId') teacherId: string,
        @Param('studentId') studentId: string,
        ) {
        return this.studentService.findOneStudent(teacherId,studentId)
    }

    @Delete('/:id')
    async delete(@Param('id') estudentId: string) {
        return this.studentService.delete(estudentId)
    }
}


