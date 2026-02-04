import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
  requestId?: string;
}

@Injectable()
export class FileUploadService {
  private files: FileUpload[] = [];

  async uploadFile(file: any, requestId?: string): Promise<FileUpload> {
    const uploadedFile: FileUpload = {
      id: Date.now().toString(),
      name: file.originalname || 'document.pdf',
      size: file.size || 1024,
      type: file.mimetype || 'application/pdf',
      url: `/uploads/${Date.now()}-${file.originalname}`,
      uploadedAt: new Date(),
      requestId,
    };

    this.files.push(uploadedFile);
    return uploadedFile;
  }

  async getFilesByRequest(requestId: string): Promise<FileUpload[]> {
    return this.files.filter(f => f.requestId === requestId);
  }

  async deleteFile(fileId: string): Promise<void> {
    this.files = this.files.filter(f => f.id !== fileId);
  }

  async downloadFile(fileId: string): Promise<FileUpload | null> {
    return this.files.find(f => f.id === fileId) || null;
  }
}