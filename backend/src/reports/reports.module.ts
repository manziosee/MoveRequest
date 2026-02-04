import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MovementRequest } from '../requests/entities/movement-request.entity';
import { RequestItem } from '../requests/entities/request-item.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovementRequest, RequestItem, User])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}