import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get all pending requests awaiting approval' })
  @ApiResponse({ status: 200, description: 'Returns list of pending requests' })
  getPendingRequests() {
    return this.approvalsService.getPendingRequests();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get approval statistics' })
  @ApiResponse({ status: 200, description: 'Returns approval metrics' })
  getApprovalStats() {
    return this.approvalsService.getApprovalStats();
  }

  @Post(':requestId/approve')
  @ApiOperation({ summary: 'Approve a request' })
  @ApiResponse({ status: 200, description: 'Request approved successfully' })
  approveRequest(
    @Param('requestId') requestId: string,
    @Body('comment') comment: string,
    @CurrentUser() user: User,
  ) {
    return this.approvalsService.approveRequest(requestId, comment, user);
  }

  @Post(':requestId/reject')
  @ApiOperation({ summary: 'Reject a request' })
  @ApiResponse({ status: 200, description: 'Request rejected successfully' })
  rejectRequest(
    @Param('requestId') requestId: string,
    @Body('reason') reason: string,
    @CurrentUser() user: User,
  ) {
    return this.approvalsService.rejectRequest(requestId, reason, user);
  }

  @Post('bulk-approve')
  @ApiOperation({ summary: 'Bulk approve multiple requests' })
  @ApiResponse({ status: 200, description: 'Requests approved successfully' })
  bulkApprove(@Body('requestIds') requestIds: string[], @CurrentUser() user: User) {
    return this.approvalsService.bulkApprove(requestIds, user);
  }
}