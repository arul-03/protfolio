import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  private configured = this.isConfigured();

  private isConfigured(): boolean {
    const { serviceId, templateId, publicKey } = environment.emailJs;
    return ![serviceId, templateId, publicKey].some((v) => v.startsWith('YOUR_'));
  }

  async sendEmail(payload: ContactPayload): Promise<void> {
    if (!this.configured) {
      const body = encodeURIComponent(
        `From: ${payload.name} (${payload.email})\n\n${payload.message}`
      );
      window.location.href = `mailto:arulkumar.2540@gmail.com?subject=${encodeURIComponent(payload.subject)}&body=${body}`;
      return;
    }

    await emailjs.send(
      environment.emailJs.serviceId,
      environment.emailJs.templateId,
      {
        from_name: payload.name,
        from_email: payload.email,
        subject: payload.subject,
        message: payload.message,
        to_email: 'arulkumar.2540@gmail.com',
      },
      environment.emailJs.publicKey
    );
  }

  isEmailJsConfigured(): boolean {
    return this.configured;
  }
}
