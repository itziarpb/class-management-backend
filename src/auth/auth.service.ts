import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeacherDto } from 'src/domain/dtos/create-teacher.dto';
import * as bcryptjs from 'bcryptjs';
import { Teacher } from 'src/domain/entities/teacher.entity';
import { TeacherService } from 'src/services/teacher.service';
import { Repository } from 'typeorm';
import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly teacherService: TeacherService,
        private readonly jwtService: JwtService,
        @InjectRepository(Teacher)
        private teacherRepo: Repository<Teacher>,
      ) { }

      //REGISTER
      async register({ name, email, password }: CreateTeacherDto) {
        const teacher = await this.teacherService.findOne(email);
        if (teacher) {
          throw new BadRequestException('Teacher already exists')
        }
        return await this.teacherRepo.save({ 
          name, 
          email, 
          password : await bcryptjs.hash(password,10)
        });
      }

      //LOGIN
      async login({email,password}: LoginDto){
        const userTeacher = await this.teacherService.findOne(email);
        if (!userTeacher) {
          throw new UnauthorizedException('Email is wrong');
        }

        const isPasswordValid = await bcryptjs.compare(password, userTeacher.password);
        if (!isPasswordValid){
            throw new UnauthorizedException('Password is wrong');
        }

        const payload ={email: userTeacher.email};
        const tokenTeacher = await this.jwtService.signAsync(payload);

        return tokenTeacher;

      }




}
