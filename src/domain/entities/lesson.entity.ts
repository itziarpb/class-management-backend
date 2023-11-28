import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './student.entity';


@Entity()
export class Lesson {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  date: string;

  @Column({ default: false })
  payment: boolean;

  @ManyToOne(() => Student, (student) => student.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Student
}