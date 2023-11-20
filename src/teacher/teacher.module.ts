import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacherservice';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}