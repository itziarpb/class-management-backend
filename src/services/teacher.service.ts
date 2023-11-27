import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../domain/entities/teacher.entity';
import { CreateTeacherDto } from 'src/domain/dtos/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
  ) { }

  async create(createTeacherDto: CreateTeacherDto) {
    return this.teacherRepo.save(createTeacherDto)
  }
}