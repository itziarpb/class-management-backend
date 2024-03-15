import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Teacher, (teacher) => teacher.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  teacher: Teacher
}
