import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { ApiModule } from './api/api.module';
import { StudentModule } from './student/student.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'itziarPB',
      password: '123456',
      database: 'my_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts:10
    }),
    TeacherModule, ApiModule, StudentModule, LessonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
