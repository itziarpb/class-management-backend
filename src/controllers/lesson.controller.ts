import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLessonDto } from 'src/domain/dtos/create-lesson.dto';
import { LessonService } from 'src/services/lesson.service';

@Controller('student/:studentId/lesson')
export class LessonController {

    constructor(
        private readonly lessonService: LessonService
    ) { }

    @Post()
    async create(
        @Param('studentId') studentId: string,
        @Body() createLessonDto: CreateLessonDto
    ) {
        return await this.lessonService.create(studentId, createLessonDto)
    }

    @Get()
    async findAllBystudent(@Param('studentId') studentId: string,) {
        return this.lessonService.findAllByStudent(studentId)
    }


}
