import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from '../controllers/teacher.controller';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../domain/entities/teacher.entity';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { User } from 'src/domain/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, User])],
  controllers: [TeacherController],
  providers: [TeacherService, UserService]
})
export class TeacherModule { }