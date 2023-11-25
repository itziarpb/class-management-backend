import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './api/modules/teacher.module';
import { StudentModule } from './api/modules/student.module';
import { LessonModule } from './api/modules/lesson.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'itziarPB',
      password: 'class159',
      database: 'my_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts:10
    }),
    TeacherModule, StudentModule, LessonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
