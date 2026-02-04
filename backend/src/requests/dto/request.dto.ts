import { IsString, IsEnum, IsDateString, IsArray, ValidateNested, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RequestPriority, RequestStatus } from '../entities/movement-request.entity';

export class CreateRequestItemDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsString()
  unit: string;

  @ApiProperty()
  @IsNumber()
  estimatedCost: number;
}

export class CreateRequestDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  department: string;

  @ApiProperty({ enum: RequestPriority })
  @IsEnum(RequestPriority)
  priority: RequestPriority;

  @ApiProperty()
  @IsDateString()
  neededBy: string;

  @ApiProperty()
  @IsString()
  fromLocation: string;

  @ApiProperty()
  @IsString()
  toLocation: string;

  @ApiProperty()
  @IsString()
  purpose: string;

  @ApiProperty({ type: [CreateRequestItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRequestItemDto)
  items: CreateRequestItemDto[];
}

export class UpdateRequestStatusDto {
  @ApiProperty({ enum: RequestStatus })
  @IsEnum(RequestStatus)
  status: RequestStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}