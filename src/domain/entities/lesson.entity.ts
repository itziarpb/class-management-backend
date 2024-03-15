import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './student.entity';
import { TaskEnum } from '../enums/task.enum';


@Entity()
export class Lesson {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column({ default: "01:00" })
  duration: string;

  @Column({ default: false })
  done: boolean;

  @Column({
    type: "enum",
    enum: TaskEnum,
    default: TaskEnum.no,
  })
  task: TaskEnum

  @Column()
  price: number;

  @Column({ default: false })
  payment: boolean;

  @ManyToOne(() => Student, (student) => student.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Student
}