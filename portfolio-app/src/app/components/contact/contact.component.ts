import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { PORTFOLIO } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  portfolio = PORTFOLIO;
  private fb = inject(FormBuilder);
  emailService = inject(EmailService);
  currentYear = new Date().getFullYear();

  sending = signal(false);
  status = signal<'idle' | 'success' | 'error'>('idle');
  statusMessage = signal('');

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.status.set('idle');

    try {
      const value = this.form.getRawValue();
      await this.emailService.sendEmail({
        name: value.name!,
        email: value.email!,
        subject: value.subject!,
        message: value.message!,
      });

      if (this.emailService.isEmailJsConfigured()) {
        this.status.set('success');
        this.statusMessage.set('Message sent successfully! I will get back to you soon.');
        this.form.reset();
      } else {
        this.status.set('success');
        this.statusMessage.set('Opening your email client to send the message...');
      }
    } catch {
      this.status.set('error');
      this.statusMessage.set('Failed to send message. Please try again or email directly.');
    } finally {
      this.sending.set(false);
    }
  }
}
