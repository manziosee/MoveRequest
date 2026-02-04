import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApprovalsService } from './approvals.service';
import { User } from '../users/entities/user.entity';

@ApiTags('approvals')
@Controller('approvals')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('procurement', 'admin')
@ApiBearerAuth()
export class ApprovalsController {
  constructor(private readonly approvalsService: ApprovalsService) {}

  @Get('pending')
  getPendingRequests() {
    return this.approvalsService.getPendingRequests();
  }

  @Get('stats')
  getApprovalStats() {
    return this.approvalsService.getApprovalStats();
  }

  @Post('bulk-approve')
  bulkApprove(@Body('requestIds') requestIds: string[], @CurrentUser() user: User) {
    return this.approvalsService.bulkApprove(requestIds, user);
  }
}