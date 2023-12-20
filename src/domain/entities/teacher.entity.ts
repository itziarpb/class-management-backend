import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Student } from './student.entity';
import { User } from './user.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, (user) => user.teacher)
  @JoinColumn()
  user: User

  @OneToMany(() => Student, (student) => student.teacher, { onDelete: 'CASCADE' })
  students: Student[]
}