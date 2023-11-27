import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Student } from './student.entity';



@Entity()
export class Teacher {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name:string

  @OneToMany(() => Student, (student) => student.teacher)
  students: Student[]
}