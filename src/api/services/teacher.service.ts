import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../entities/teacher.entity';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(Teacher)
        private teacherRepo: Repository<Teacher>,
      ) {}
    

}