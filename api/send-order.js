export const config = {
  api: {
    bodyParser: {
      sizeLimit: '12mb'
    }
  }
};

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { to, subject, message, filename, fileBase64 } = req.body || {};

    if (!fileBase64 || typeof fileBase64 !== 'string') {
      res.status(400).json({ error: 'Missing fileBase64' });
      return;
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true';

    if (!smtpHost || !smtpUser || !smtpPass) {
      res.status(500).json({ error: 'SMTP not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (and optional SMTP_SECURE=true).' });
      return;
    }

    const transport = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: { user: smtpUser, pass: smtpPass }
    });

    const pdfBuffer = Buffer.from(fileBase64, 'base64');

    await transport.sendMail({
      from: smtpUser,
      to: to || 'pflegebox@pb-marina.de',
      subject: subject || 'Neue Pflegebox-Bestellung (Konfigurator)',
      text: message || 'Im Anhang findest du die ausgefüllten Formulare aus dem Konfigurator.',
      attachments: [{
        filename: filename || 'Pflegehilfsmittel_Paket.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf'
      }]
    });

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e?.message || 'Unknown error' });
  }
}
