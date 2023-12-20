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

  //Create new teacher 
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

  //get teacher by id
  async getTeacher(teacherId: string) {
    const teacher = await this.teacherRepo.findOneOrFail({
        where: {
            id: teacherId
        }
    });
    return teacher
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