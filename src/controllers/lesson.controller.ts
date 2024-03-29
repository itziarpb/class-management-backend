import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateLessonDto } from 'src/domain/dtos/create-lesson.dto';
import { Lesson } from 'src/domain/entities/lesson.entity';
import { LessonService } from 'src/services/lesson.service';

@Controller()
export class LessonController {

    constructor(
        private readonly lessonService: LessonService
    ) { }

    //Create new lesson
    @UseGuards(AuthGuard)
    @Post('student/:studentId/lesson')
    async create(
        @Param('studentId') studentId: string,
        @Body() createLessonDto: CreateLessonDto
    ) {
        return await this.lessonService.createLesson(studentId, createLessonDto)
    }

    //Get all lesson
    @UseGuards(AuthGuard)
    @Get('teacher/:teacherId/lesson')
    async findAllByTeacher(@Param('teacherId') teacherId: string,) {
        return this.lessonService.findAllLesson(teacherId)
    }


    //Get all lesson from a student
    @UseGuards(AuthGuard)
    @Get('student/:studentId/lesson')
    async findAllBystudent(@Param('studentId') studentId: string,) {
        return this.lessonService.findAllByStudent(studentId)
    }

    //Get one lesson
    @UseGuards(AuthGuard)
    @Get('student/:studentId/lesson/:lessonId')
    async findOneLesson(
        @Param('studentId') studentId: string,
        @Param('lessonId') lessonId: string
    ) {
        return this.lessonService.findOneLesson(studentId, lessonId)
    }

    //Put update lesson
    @UseGuards(AuthGuard)
    @Put('student/:studentId/lesson/:lessonId')
    async updateLesson(@Param('lessonId') lessonId: string, @Body() data: Partial<Lesson>) {
        return this.lessonService.updateLesson(lessonId, data);
    }

    //Delete lesson
    @Delete('student/:studentId/lesson/:id')
    async delete(@Param('id') lessonId: string) {
        return this.lessonService.delete(lessonId)
    }

}
