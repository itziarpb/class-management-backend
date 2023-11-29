import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './modules/teacher.module';
import { StudentModule } from './modules/student.module';
import { LessonModule } from './modules/lesson.module';
import { Lesson } from './domain/entities/lesson.entity';
import { Student } from './domain/entities/student.entity';
import { Teacher } from './domain/entities/teacher.entity';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'my_db',
      entities: [Lesson, Student, Teacher],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10
    }),
    TeacherModule, StudentModule, LessonModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AppService],
})
export class AppModule { }
