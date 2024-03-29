import { Body, Controller, Delete, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateTeacherDto } from 'src/domain/dtos/create-teacher.dto';
import { TeacherService } from 'src/services/teacher.service';

@Controller('teacher')
export class TeacherController {
    constructor(
        private readonly teacherService: TeacherService
    ) { }

    @Post('/:userId')
    async createTeacher(@Param('userId') userId: string){
        return this.teacherService.createTeacher(userId)
    }

    @Get('/:userId')
    async getTeacher(@Param('userId') userId: string) {
        return this.teacherService.getTeacher(userId)
    }
    // @Get()
    // async findAll() {
    //     return this.teacherService.findAll()
    // }

    // @Delete('/:id')
    // async delete(@Param('id') teacherId: string) {
    //     return this.teacherService.delete(teacherId)
    // }
}
