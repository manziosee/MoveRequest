import { Controller, Get, Post, Body, Patch, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequestsService } from './requests.service';
import { CreateRequestDto, UpdateRequestStatusDto } from './dto/request.dto';
import { User } from '../users/entities/user.entity';

@ApiTags('requests')
@Controller('requests')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new request' })
  create(@Body() createRequestDto: CreateRequestDto, @CurrentUser() user: User) {
    return this.requestsService.create(createRequestDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all requests' })
  findAll(@CurrentUser() user: User) {
    return this.requestsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get request by ID' })
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update request status' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateRequestStatusDto,
    @CurrentUser() user: User,
  ) {
    return this.requestsService.updateStatus(id, updateStatusDto, user);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel request' })
  cancelRequest(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @CurrentUser() user: User,
  ) {
    return this.requestsService.cancelRequest(id, reason, user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update request' })
  updateRequest(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateRequestDto>,
    @CurrentUser() user: User,
  ) {
    return this.requestsService.updateRequest(id, updateData, user);
  }
}