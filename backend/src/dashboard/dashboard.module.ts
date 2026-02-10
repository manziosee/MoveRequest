import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { MovementRequest } from '../requests/entities/movement-request.entity';
import { User } from '../users/entities/user.entity';
import { RequestItem } from '../requests/entities/request-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovementRequest, User, RequestItem]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}