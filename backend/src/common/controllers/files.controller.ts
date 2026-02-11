import { Controller, Post, Get, Delete, Param, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { FileUploadService } from '../services/file-upload.service';

@ApiTags('files')
@Controller('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  async uploadFile(@UploadedFile() file: any) {
    return this.fileUploadService.uploadFile(file);
  }

  @Post('upload/:requestId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload file and attach to request' })
  @ApiResponse({ status: 201, description: 'File uploaded and attached to request' })
  async uploadFileToRequest(
    @UploadedFile() file: any,
    @Param('requestId') requestId: string,
  ) {
    return this.fileUploadService.uploadFile(file, requestId);
  }

  @Get('request/:requestId')
  @ApiOperation({ summary: 'Get all files for a request' })
  @ApiResponse({ status: 200, description: 'Returns list of files for the request' })
  async getRequestFiles(@Param('requestId') requestId: string) {
    return this.fileUploadService.getFilesByRequest(requestId);
  }

  @Get('download/:fileId')
  @ApiOperation({ summary: 'Download a file' })
  @ApiResponse({ status: 200, description: 'Returns file for download' })
  async downloadFile(@Param('fileId') fileId: string) {
    return this.fileUploadService.downloadFile(fileId);
  }

  @Delete(':fileId')
  @ApiOperation({ summary: 'Delete a file' })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  async deleteFile(@Param('fileId') fileId: string) {
    await this.fileUploadService.deleteFile(fileId);
    return { message: 'File deleted successfully' };
  }
}