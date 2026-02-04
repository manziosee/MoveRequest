import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MovementRequest } from './movement-request.entity';

export enum ApprovalAction {
  CREATED = 'created',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  UPDATED = 'updated',
}

@Entity('approval_history')
export class ApprovalHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action: string;

  @Column()
  performedBy: string;

  @Column()
  performedByName: string;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => MovementRequest, request => request.approvalHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'requestId' })
  request: MovementRequest;

  @Column()
  requestId: string;

  @CreateDateColumn()
  timestamp: Date;
}