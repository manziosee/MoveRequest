import { Controller, Post, Get, Delete, Param, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
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
  async uploadFile(@UploadedFile() file: any) {
    return this.fileUploadService.uploadFile(file);
  }

  @Post('upload/:requestId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async uploadFileToRequest(
    @UploadedFile() file: any,
    @Param('requestId') requestId: string,
  ) {
    return this.fileUploadService.uploadFile(file, requestId);
  }

  @Get('request/:requestId')
  async getRequestFiles(@Param('requestId') requestId: string) {
    return this.fileUploadService.getFilesByRequest(requestId);
  }

  @Get('download/:fileId')
  async downloadFile(@Param('fileId') fileId: string) {
    return this.fileUploadService.downloadFile(fileId);
  }

  @Delete(':fileId')
  async deleteFile(@Param('fileId') fileId: string) {
    await this.fileUploadService.deleteFile(fileId);
    return { message: 'File deleted successfully' };
  }
}