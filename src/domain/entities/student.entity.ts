import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Lesson } from './lesson.entity';
import { Teacher } from './teacher.entity';
import { GradeEnum } from '../enums/grade.enum';



@Entity()
export class Student {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: GradeEnum
  })
  grade: GradeEnum;

  @ManyToOne(() => Teacher, (teacher) => teacher.students)
  teacher: Teacher

  @OneToMany(() => Lesson, (lesson) => lesson.student)
  lessons: Lesson[]
}