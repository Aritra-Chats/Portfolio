import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import type { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;
const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const smtpPort = Number.parseInt(process.env.SMTP_PORT || '587', 10);
const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const mailFrom = process.env.SMTP_FROM || smtpUser;
const mailTo = process.env.EMAIL_TO || smtpUser;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
  const { name, email, message } = req.body as Record<string, string | undefined>;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  if (!smtpUser || !smtpPass || !mailFrom || !mailTo) {
    res.status(503).json({
      error: 'Email delivery is not configured on this backend.',
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${mailFrom}>`,
      to: mailTo,
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:monospace;background:#0a0a0a;color:#f0f0f0;padding:24px;border-radius:8px;">
          <h2 style="margin:0 0 16px;font-size:20px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#1a1a1a;padding:12px;border-radius:4px;white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });

    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (err: unknown) {
    console.error('Email send failed:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// Health check
app.get('/api/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (_req: Request, res: Response): void => {
  res.json({
    status: 'ok',
    message: 'Backend is running in API-only mode.',
  });
});

app.listen(PORT, () => {
  console.log(`\n  ◆ Aritra Portfolio Server`);
  console.log(`  → http://localhost:${PORT}\n`);
});
