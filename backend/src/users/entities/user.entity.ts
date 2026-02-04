import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { MovementRequest } from '../../requests/entities/movement-request.entity';

export enum UserRole {
  EMPLOYEE = 'employee',
  PROCUREMENT = 'procurement',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: 'employee' })
  role: string;

  @Column()
  department: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => MovementRequest, request => request.createdBy)
  requests: MovementRequest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}