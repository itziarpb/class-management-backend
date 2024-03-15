import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../domain/entities/student.entity';
import { CreateStudentDto } from 'src/domain/dtos/create-student.dto';
import { Teacher } from 'src/domain/entities/teacher.entity';
import { Lesson } from 'src/domain/entities/lesson.entity';
import { TeacherService } from './teacher.service';

@Injectable()
export class StudentService {
  constructor(
    private readonly teacherService: TeacherService,
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(Lesson)
    private lessonRepo: Repository<Lesson>,
  ) { }

  //Create new student
  async create(teacherId: string, { name, grade }: CreateStudentDto) {
    const teacher = await this.teacherService.getTeacherById(teacherId)
    if (!teacher) {
      throw new NotFoundException("Teacher not found")
    }

    const existingStudent = await this.studentRepo.findOne({
      where: {
        name: name
      }
    });
    if (existingStudent) {
      throw new BadRequestException('Student already exists')
    }

    const student = this.studentRepo.create({
      name,
      grade,
      teacher: teacher // Asignar el profesor al estudiante
    });


    return this.studentRepo.save(student)
  }

  //get student by id
  async getStudent(studentId: string) {
    try {
      const student = await this.studentRepo.findOne({
        where: {
          id: studentId
        }
      });
      return student
    }
    catch (err) {
      throw new NotFoundException("Student not found")
    }
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



  // //put update student
  // async updateStudent(studentId: string, data: Partial<Student>): Promise<Student> {
  //   const studentUpdate = await this.studentRepo.update(studentId, data);
  //   return this.studentRepo.findOne({
  //     where: { id: studentId },
  //   });
  // }

  // async delete(studentId: string) {
  //   try {
  //     const student = await this.studentRepo.findOneOrFail({
  //       where: {
  //         id: studentId
  //       }
  //     });
  //     this.studentRepo.remove(student);
  //     return `Student ${studentId} delete`;
  //   }
  //   catch (err) {
  //     throw new NotFoundException(`Student ${studentId} not found`);
  //   }
  // }

}
