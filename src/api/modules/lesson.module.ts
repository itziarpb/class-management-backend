import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonController } from '../controllers/lesson.controller';
import { LessonService } from '../services/lesson.service';
import { Lesson } from '../entities/lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson])],
  controllers: [LessonController],
  providers: [LessonService]
})
export class LessonModule {}
