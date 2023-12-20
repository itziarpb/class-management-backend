import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToOne(() => Teacher, (teacher) => teacher.user,{ onDelete: 'CASCADE' })
  @JoinColumn()
  teacher: Teacher
}
