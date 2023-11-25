import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from '../controllers/teacher.controller';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../entities/teacher.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}