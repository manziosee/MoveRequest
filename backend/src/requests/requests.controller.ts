import { Controller, Get, Post, Body, Patch, Param, Put, Query, UseGuards, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/request.dto';
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
    return this.requestsService.create(createRequestDto, Number(user.id));
  }

  @Get()
  @ApiOperation({ summary: 'Get all requests with filters' })
  findAll(
    @CurrentUser() user: User,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('department') department?: string,
  ) {
    return this.requestsService.findAll(Number(user.id), user.role, { status, priority, department });
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get request statistics' })
  getStats(@CurrentUser() user: User) {
    return this.requestsService.getStats(Number(user.id), user.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get request by ID' })
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update request' })
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.requestsService.update(Number(id), updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete request' })
  delete(@Param('id') id: string) {
    return this.requestsService.delete(Number(id));
  }
}