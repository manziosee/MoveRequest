import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RequestItem } from './request-item.entity';
import { ApprovalHistory } from './approval-history.entity';

export enum RequestStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export enum RequestPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity('movement_requests')
export class MovementRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  department: string;

  @Column({ default: 'draft' })
  status: string;

  @Column({ default: 'medium' })
  priority: string;

  @Column()
  neededBy: Date;

  @Column()
  fromLocation: string;

  @Column()
  toLocation: string;

  @Column('text')
  purpose: string;

  @Column({ nullable: true })
  rejectionReason: string;

  @ManyToOne(() => User, user => user.requests)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column()
  createdById: string;

  @Column({ nullable: true })
  approvedById: string;

  @OneToMany(() => RequestItem, item => item.request, { cascade: true })
  items: RequestItem[];

  @OneToMany(() => ApprovalHistory, history => history.request, { cascade: true })
  approvalHistory: ApprovalHistory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}