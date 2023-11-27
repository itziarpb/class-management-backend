import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonController } from '../controllers/lesson.controller';
import { LessonService } from '../services/lesson.service';
import { Lesson } from '../domain/entities/lesson.entity';
import { StudentController } from 'src/controllers/student.controller';
import { StudentService } from 'src/services/student.service';
import { Student } from 'src/domain/entities/student.entity';
import { Teacher } from 'src/domain/entities/teacher.entity';
import { TeacherController } from 'src/controllers/teacher.controller';
import { TeacherService } from 'src/services/teacher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, Student, Teacher])],
  controllers: [LessonController, StudentController, TeacherController],
  providers: [LessonService, StudentService, TeacherService]
})
export class LessonModule {}
