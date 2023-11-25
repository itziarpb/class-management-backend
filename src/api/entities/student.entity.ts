import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToMany } from 'typeorm';
import { Lesson } from 'src/api/entities/lesson.entity';
import { Teacher } from 'src/api/entities/teacher.entity';


@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  grade: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.students)
    teacher: Teacher

  @OneToMany(() => Lesson, (lesson) => lesson.student)
    lessons: Lesson[]

}