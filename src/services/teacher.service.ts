import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Teacher } from '../domain/entities/teacher.entity';
import { User } from 'src/domain/entities/user.entity';
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
    console.log("🚀 ~ file: teacher.service.ts:21 ~ TeacherService ~ createTeacher ~ user:", user)

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