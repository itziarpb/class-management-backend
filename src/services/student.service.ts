import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../domain/entities/student.entity';
import { CreateStudentDto } from 'src/domain/dtos/create-student.dto';
import { Teacher } from 'src/domain/entities/teacher.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
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
      return this.studentRepo.findBy({ teacher: teacher })
      
    }
    catch (err) {
      throw new NotFoundException("Teacher not found")
    }
  }
}
