import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Teacher } from '../domain/entities/teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
  ) { }

  async findAll() {
    return this.teacherRepo.find();
  }

  //Login Teacher
  async findOne(email: string): Promise<Teacher | null> {
    const options: FindOneOptions<Teacher> = {
      where: { email },
    };
    return await this.teacherRepo.findOne(options)
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