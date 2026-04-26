import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'path';
import type { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// Serve static frontend build in production
const frontendBuildPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendBuildPath));

// Contact form endpoint
app.post('/api/contact', (req: Request, res: Response): void => {
  const { name, email, message } = req.body as Record<string, string | undefined>;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  });

  transporter
    .sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: 'aritrachatterjee1904@gmail.com',
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
    })
    .then(() => {
      res.json({ success: true, message: 'Message sent successfully.' });
    })
    .catch((err: unknown) => {
      console.error('Email send failed:', err);
      res.json({ success: true, message: 'Message received.' });
    });
});

// Health check
app.get('/api/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Fallback to frontend SPA
app.get('*', (_req: Request, res: Response): void => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  ◆ Aritra Portfolio Server`);
  console.log(`  → http://localhost:${PORT}\n`);
});
