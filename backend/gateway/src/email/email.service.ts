import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    constructor() {
      this.transporter = nodemailer.createTransport({
        service: process.env.MAILER_SERVICE,
        auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_SECRET_KEY,
        },
      });
    }

    async sendEmail(options: { to: string, subject: string, html: string }) {
        const mailOptions = {
          from: process.env.MAILER_EMAIL,
          to: options.to,
          subject: options.subject,
          html: options.html,
        };
    
        return await this.transporter.sendMail(mailOptions);
    }

    async sendVerificationEmail(email: string, token: string) {
      const url = `${process.env.BACKEND_URL}/verify?token=${token}`;
      return await this.transporter.sendMail({
        to: email,
        subject: 'IUPI: Verifica tu correo',
        html: `<p>Accede al siguiente enlace para verificar tu cuenta: <a href="${url}">Verifica tu cuenta</a><br><p>Recuerda que el enlace tiene validez por 5 minutos.</p>`,
      });
    }
}
