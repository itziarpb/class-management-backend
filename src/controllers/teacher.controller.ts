import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTeacherDto } from 'src/domain/dtos/create-teacher.dto';
import { TeacherService } from 'src/services/teacher.service';

@Controller('teacher')
export class TeacherController {
    constructor(
        private readonly teacherService: TeacherService
    ) { }

    @Get()
    async findAll() {
        return this.teacherService.findAll()
    }

    @Delete('/:id')
    async delete(@Param('id') teacherId: string) {
        return this.teacherService.delete(teacherId)
    }
}
