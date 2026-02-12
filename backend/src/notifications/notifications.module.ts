import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsGateway } from './notifications.gateway';
import { EmailService } from '../common/email.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsGateway, EmailService],
  exports: [NotificationsService, NotificationsGateway, EmailService],
})
export class NotificationsModule {}