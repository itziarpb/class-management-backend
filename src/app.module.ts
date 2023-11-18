import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ApiModule } from './api/api.module';
import { StudentModule } from './student/student.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [UserModule, ApiModule, StudentModule, LessonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
