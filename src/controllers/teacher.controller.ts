import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTeacherDto } from 'src/domain/dtos/create-teacher.dto';
import { TeacherService } from 'src/services/teacher.service';

@Controller('teacher')
export class TeacherController {
    constructor(
        private readonly teacherService: TeacherService
    ) { }

    @Post()
    async create(
        @Body() createTeacherDto: CreateTeacherDto
    ) {
        return this.teacherService.create(createTeacherDto)
    }

    @Get()
    async findAll() {
        return this.teacherService.findAll()
    }



}
