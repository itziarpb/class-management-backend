import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../domain/entities/lesson.entity';
import { Student } from 'src/domain/entities/student.entity';
import { CreateLessonDto } from 'src/domain/dtos/create-lesson.dto';
import { Teacher } from 'src/domain/entities/teacher.entity';
import { on } from 'stream';

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

  //Create new lesson
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

  //Get all lesson (from a teacher)
  async findAllLesson(teacherId: string) {
    const teacher = await this.teacherRepo.findOneOrFail({
      where: {
        id: teacherId
      }
    });
    const allIdStudentTeacher = await this.studentRepo.find({
      where: { teacher: teacher }
    })
    const allLesson = []
    for (const student of allIdStudentTeacher) {
      const lessonsStudent = await this.lessonRepo.find({
        where: { student: student },
        //select: ['date'] sirve para seleccionar solo una parte
      });
      allLesson.push(lessonsStudent)
    }
    return allLesson;
  }


  //Get all lesson form a student
  async findAllByStudent(studentId: string) {
    try {
      const student = await this.studentRepo.findOneOrFail({
        where: {
          id: studentId
        }
      });
      const allLessonsStudent = await this.lessonRepo.find({
        where: { student: student },
        relations: ['student']
      })
      return allLessonsStudent
    }
    catch (err) {
      throw new NotFoundException("Teacher not found")
    }
  }

  //Get one lesson
  async findOneLesson(studentId: string, lessonId: string) {
    try {
      const student = await this.studentRepo.findOneOrFail({
        where: {
          id: studentId
        }
      });
      const oneLesson = await this.lessonRepo.findOne({
        where: { id: lessonId }
      })
      return oneLesson;

    }
    catch (err) {
      throw new NotFoundException("Teacher not found")
    }
  }


  async delete(lessonId: string) {
    try {
      const lesson = await this.lessonRepo.findOneOrFail({
        where: {
          id: lessonId
        }
      });
      this.lessonRepo.remove(lesson);
      return `Lesson ${lessonId} delete`;
    }
    catch (err) {
      throw new NotFoundException(`Lesson ${lessonId} not found`);
    }
  }

}
