import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../domain/entities/teacher.entity';
import { UserService } from './user.service';

@Injectable()
export class TeacherService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,

  ) { }

  //Create new teacher.   //Assign a teacherID to a user. This will change in future version
  async createTeacher(userId: string) {
    const user = await this.userService.getUser(userId)
    const teacher = await this.teacherRepo.findOne({
      where: {
        user: user
      }
    });
    if (teacher) {
      throw new BadRequestException('Teacher already exists')
    }
    return this.teacherRepo.save({
      user: user
    })
  }

  //get teacher by user
  async getTeacher(userId: string) {
    try {
      const user = await this.userService.getUser(userId)
      const teacher = await this.teacherRepo.findOne({
        where: {
          user: user
        }
      });
      return teacher
    }
    catch (err) {
      throw new NotFoundException("Teacher not found")
    }
  }

  //get teacher by id
  async getTeacherById(teacherId: string) {
    try {
      const teacher = await this.teacherRepo.findOne({
        where: {
          id: teacherId
        }
      });
      return teacher
    }
    catch (err) {
      throw new NotFoundException("Teacher not found")
    }
  }






  async findAll() {
    return this.teacherRepo.find();
  }



  //Delete teacher
  async delete(teacherId: string) {
    try {
      const teacher = await this.teacherRepo.findOneOrFail({
        where: {
          id: teacherId
        }
      });
      this.teacherRepo.remove(teacher);
      return `Teacher ${teacherId} delete`;
    }
    catch (err) {
      throw new NotFoundException(`Teacher ${teacherId} not found`);
    }
  }


}