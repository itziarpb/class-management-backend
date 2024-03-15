import { Body, Controller, Get, Post, Param, ValidationPipe, Delete, UseGuards, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateStudentDto } from 'src/domain/dtos/create-student.dto';
import { Student } from 'src/domain/entities/student.entity';
import { StudentService } from 'src/services/student.service';

@Controller('/student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) { }

    //Create new Student
    // @UseGuards(AuthGuard)
    @Post("/:teacherId")
    @ApiCreatedResponse({ type: Student })
    async create(
        @Param('teacherId') teacherId: string,
        @Body() createStudentDto: CreateStudentDto
    ) {
        return await this.studentService.create(teacherId, createStudentDto)
    }

    //Get all student (from a Teacher)
    // @UseGuards(AuthGuard)
    @Get("/:teacherId")
    async findAllByTeacher(@Param('teacherId') teacherId: string,) {
        return this.studentService.findAllByTeacher(teacherId)
    }

    //Get one student (from a Teacher)
    // @UseGuards(AuthGuard)
    @Get('/:studentId')
    async findOneStudent(
        @Param('studentId') studentId: string,
    ) {
        return this.studentService.getStudent(studentId)
    }

    // //Put update student
    // @UseGuards(AuthGuard)
    // @Put(':studentId')
    // async updateStudent(@Param('studentId') studentId: string, @Body() data: Partial<Student>) {
    //     return this.studentService.updateStudent(studentId, data);
    // }

    // //Delete student
    // @Delete('/:id')
    // async delete(@Param('id') estudentId: string) {
    //     return this.studentService.delete(estudentId)
    // }
}


