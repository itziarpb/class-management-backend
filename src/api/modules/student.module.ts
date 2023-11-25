import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from '../controllers/student.controller';
import { StudentService } from '../services/student.service';
import { Student } from '../entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
