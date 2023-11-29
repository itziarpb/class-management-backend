import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from '../controllers/student.controller';
import { StudentService } from '../services/student.service';
import { Student } from '../domain/entities/student.entity';
import { Teacher } from 'src/domain/entities/teacher.entity';
import { TeacherController } from 'src/controllers/teacher.controller';
import { TeacherService } from 'src/services/teacher.service';
import { LessonController } from 'src/controllers/lesson.controller';
import { LessonService } from 'src/services/lesson.service';
import { Lesson } from 'src/domain/entities/lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Teacher, Lesson])],
  controllers: [StudentController, TeacherController, LessonController],
  providers: [StudentService, TeacherService, LessonService]
})
export class StudentModule {}
