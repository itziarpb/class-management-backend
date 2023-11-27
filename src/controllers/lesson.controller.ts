import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLessonDto } from 'src/domain/dtos/create-lesson.dto';
import { LessonService } from 'src/services/lesson.service';

@Controller()
export class LessonController {

    constructor(
        private readonly lessonService: LessonService
    ) { }

    @Post('student/:studentId/lesson')
    async create(
        @Param('studentId') studentId: string,
        @Body() createLessonDto: CreateLessonDto
    ) {
        return await this.lessonService.create(studentId, createLessonDto)
    }

    @Get('student/:studentId/lesson')
    async findAllBystudent(@Param('studentId') studentId: string,) {
        return this.lessonService.findAllByStudent(studentId)
    }


}
