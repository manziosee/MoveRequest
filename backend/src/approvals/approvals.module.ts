import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalsService } from './approvals.service';
import { ApprovalsController } from './approvals.controller';
import { MovementRequest } from '../requests/entities/movement-request.entity';
import { ApprovalHistory } from '../requests/entities/approval-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovementRequest, ApprovalHistory])],
  controllers: [ApprovalsController],
  providers: [ApprovalsService],
})
export class ApprovalsModule {}