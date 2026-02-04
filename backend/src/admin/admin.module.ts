import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Category } from './entities/category.entity';
import { Department } from './entities/department.entity';
import { User } from '../users/entities/user.entity';
import { MovementRequest } from '../requests/entities/movement-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Department, User, MovementRequest])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}