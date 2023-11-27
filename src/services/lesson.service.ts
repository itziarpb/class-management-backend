import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../domain/entities/lesson.entity';
import { Student } from 'src/domain/entities/student.entity';
import { CreateLessonDto } from 'src/domain/dtos/create-lesson.dto';
import { Teacher } from 'src/domain/entities/teacher.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(Lesson)
    private lessonRepo: Repository<Lesson>,
  ) { }

  async create(studentId: string, createLessonDto: CreateLessonDto) {
    try {
      const student = await this.studentRepo.findOneOrFail({
        where: {
          id: studentId
        }
      });
      return this.lessonRepo.save({
        ...createLessonDto,
        student: student
      })
    }
    catch (err) {
      throw new NotFoundException("Student not found")
    }
  }

  async findAllByStudent(studentId: string) {
    try {
      const student = await this.studentRepo.findOneOrFail({
        where: {
          id: studentId
        }
      });
      return this.lessonRepo.findBy({ student: student })

    }
    catch (err) {
      throw new NotFoundException("Teacher not found")
    }
  }
}
