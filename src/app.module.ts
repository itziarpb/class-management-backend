import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { ApiModule } from './api/api.module';
import { StudentModule } from './student/student.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [TeacherModule, ApiModule, StudentModule, LessonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
