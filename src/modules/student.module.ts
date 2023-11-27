import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from '../controllers/student.controller';
import { StudentService } from '../services/student.service';
import { Student } from '../domain/entities/student.entity';
import { Teacher } from 'src/domain/entities/teacher.entity';
import { TeacherController } from 'src/controllers/teacher.controller';
import { TeacherService } from 'src/services/teacher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Teacher])],
  controllers: [StudentController, TeacherController],
  providers: [StudentService, TeacherService]
})
export class StudentModule {}
