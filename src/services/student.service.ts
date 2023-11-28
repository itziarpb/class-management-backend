import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../domain/entities/student.entity';
import { CreateStudentDto } from 'src/domain/dtos/create-student.dto';
import { Teacher } from 'src/domain/entities/teacher.entity';
import { Lesson } from 'src/domain/entities/lesson.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(Lesson)
    private lessonRepo: Repository<Lesson>,
  ) { }

  async create(teacherId: string, createStudentDto: CreateStudentDto) {
    try {
      const teacher = await this.teacherRepo.findOneOrFail({
        where: {
          id: teacherId
        }
      });
      return this.studentRepo.save({
        ...createStudentDto,
        teacher: teacher
      })
    }
    catch (err) {
      throw new NotFoundException("Teacher not found")
    }
  }

  async findAllByTeacher(teacherId: string) {
    try {
      const teacher = await this.teacherRepo.findOneOrFail({
        where: {
          id: teacherId
        }
      });
      const allStudentTeacher = await this.studentRepo.find({
        where: { teacher: teacher },
        relations: ['lessons']
      })
      console.log(allStudentTeacher)
      return allStudentTeacher
    }
    catch (err) {
      throw new NotFoundException("Teacher not found")
    }
  }

  async delete(studentId: string) {
    try {
      const student = await this.studentRepo.findOneOrFail({
        where: {
          id: studentId
        }
      });
      this.studentRepo.remove(student);
      return `Student ${studentId} delete`;
    }
    catch (err) {
      throw new NotFoundException(`Student ${studentId} not found`);
    }
  }

}
