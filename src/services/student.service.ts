import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  //Create new student
  async create(teacherId: string, { name, email, price, grade }: CreateStudentDto) {

    const teacher = await this.teacherRepo.findOneOrFail({
      where: {
        id: teacherId
      }
    });
    if (!teacher) {
      throw new NotFoundException("Teacher not found")
    }

    const student = await this.studentRepo.findOne({
      where: {
        email: email
      }
    });
    if (student) {
      throw new BadRequestException('Student already exists')
    }

    return this.studentRepo.save({
      name, email, price, grade,
      teacher: teacher
    })
  }
  
  //Get all student from the teacher
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

  //Get one student (from a Teacher)
  async findOneStudent(teacherId: string, studentId:string, ) {
    try {
      const teacher = await this.teacherRepo.findOneOrFail({
        where: {
          id: teacherId
        }
      });
      const oneStudent = await this.studentRepo.find({
        where: { id: studentId },
      })
      console.log(oneStudent)
      return oneStudent
    }
    catch (err) {
      throw new NotFoundException("Student not found")
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
