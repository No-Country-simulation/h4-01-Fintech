import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigEnvs } from '../config/envs';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: ConfigEnvs.MAILER_SERVICE,
      host: ConfigEnvs.MAILER_HOST,
      secure: false,
      auth: {
        user: ConfigEnvs.MAILER_EMAIL,
        pass: ConfigEnvs.MAILER_SECRET_KEY,
      },
    });
  }

  async sendEmail(options: { to: string; subject: string; html: string }) {
    const mailOptions = {
      from: ConfigEnvs.MAILER_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendVerificationEmail(email: string, token: string) {
    const url = `${ConfigEnvs.FRONTEND_URL}/auth/verify?token=${encodeURIComponent(token)}`;
    return await this.transporter.sendMail({
      to: email,
      subject: 'IUPI: Verifica tu correo',
      html: `
  <p>Accede al siguiente enlace para verificar tu cuenta:</p>
  <p>
    <a href="${url}" target="_blank" style="color: #007BFF; text-decoration: none;">Verifica tu cuenta</a>
  </p>
  <p>Si el enlace no funciona, copia y pega esta URL en tu navegador:</p>
  <p>${url}</p>
  <p>Recuerda que el enlace tiene validez por 5 minutos.</p>
`,
    });
  }
}