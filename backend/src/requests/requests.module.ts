import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { MovementRequest } from './entities/movement-request.entity';
import { RequestItem } from './entities/request-item.entity';
import { ApprovalHistory } from './entities/approval-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovementRequest, RequestItem, ApprovalHistory])],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}