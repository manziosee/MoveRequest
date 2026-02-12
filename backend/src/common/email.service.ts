import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(this.configService.get('SENDGRID_API_KEY'));
  }

  async sendRequestSubmittedEmail(to: string, requestTitle: string, requestId: number) {
    const msg = {
      to,
      from: {
        email: this.configService.get('SENDGRID_FROM_EMAIL'),
        name: this.configService.get('SENDGRID_FROM_NAME'),
      },
      subject: 'Request Submitted Successfully',
      html: `
        <h2>Request Submitted</h2>
        <p>Your request has been submitted successfully.</p>
        <p><strong>Request:</strong> ${requestTitle}</p>
        <p><strong>Request ID:</strong> #${requestId}</p>
        <p>You will be notified once it's reviewed.</p>
        <br>
        <p>Best regards,<br>MoveRequest Team</p>
      `,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendNewRequestNotification(to: string, requestTitle: string, requestId: number, employeeName: string) {
    const msg = {
      to,
      from: {
        email: this.configService.get('SENDGRID_FROM_EMAIL'),
        name: this.configService.get('SENDGRID_FROM_NAME'),
      },
      subject: 'New Request Pending Approval',
      html: `
        <h2>New Request Pending Your Approval</h2>
        <p>A new request has been submitted and requires your approval.</p>
        <p><strong>Request:</strong> ${requestTitle}</p>
        <p><strong>Request ID:</strong> #${requestId}</p>
        <p><strong>Submitted by:</strong> ${employeeName}</p>
        <p>Please review and approve/reject this request.</p>
        <br>
        <p>Best regards,<br>MoveRequest Team</p>
      `,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendRequestApprovedEmail(to: string, requestTitle: string, requestId: number, approverName: string, comments?: string) {
    const msg = {
      to,
      from: {
        email: this.configService.get('SENDGRID_FROM_EMAIL'),
        name: this.configService.get('SENDGRID_FROM_NAME'),
      },
      subject: 'Request Approved',
      html: `
        <h2>Request Approved ✅</h2>
        <p>Your request has been approved!</p>
        <p><strong>Request:</strong> ${requestTitle}</p>
        <p><strong>Request ID:</strong> #${requestId}</p>
        <p><strong>Approved by:</strong> ${approverName}</p>
        ${comments ? `<p><strong>Comments:</strong> ${comments}</p>` : ''}
        <br>
        <p>Best regards,<br>MoveRequest Team</p>
      `,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendRequestRejectedEmail(to: string, requestTitle: string, requestId: number, approverName: string, comments?: string) {
    const msg = {
      to,
      from: {
        email: this.configService.get('SENDGRID_FROM_EMAIL'),
        name: this.configService.get('SENDGRID_FROM_NAME'),
      },
      subject: 'Request Rejected',
      html: `
        <h2>Request Rejected ❌</h2>
        <p>Your request has been rejected.</p>
        <p><strong>Request:</strong> ${requestTitle}</p>
        <p><strong>Request ID:</strong> #${requestId}</p>
        <p><strong>Rejected by:</strong> ${approverName}</p>
        ${comments ? `<p><strong>Reason:</strong> ${comments}</p>` : ''}
        <p>Please review the feedback and submit a new request if needed.</p>
        <br>
        <p>Best regards,<br>MoveRequest Team</p>
      `,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
