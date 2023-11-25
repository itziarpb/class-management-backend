import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from 'src/api/entities/student.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column({default:false})
  payment: boolean;

  @ManyToOne(() => Student, (student) => student.lessons)
    student: Student  
}