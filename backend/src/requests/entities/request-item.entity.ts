import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MovementRequest } from './movement-request.entity';

@Entity('request_items')
export class RequestItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column('int')
  quantity: number;

  @Column()
  unit: string;

  @Column('decimal', { precision: 10, scale: 2 })
  estimatedCost: number;

  @ManyToOne(() => MovementRequest, request => request.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'requestId' })
  request: MovementRequest;

  @Column()
  requestId: string;
}