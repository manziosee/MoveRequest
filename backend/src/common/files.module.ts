import { Module } from '@nestjs/common';
import { FilesController } from './controllers/files.controller';
import { FileUploadService } from './services/file-upload.service';

@Module({
  controllers: [FilesController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FilesModule {}