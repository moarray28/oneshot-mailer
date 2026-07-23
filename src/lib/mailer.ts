import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

export async function verifyTransporter() {
  const transporter = getTransporter();

  await transporter.verify();

  return true;
}

export async function sendMail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  const transporter = getTransporter();

  return transporter.sendMail({
    from:
      process.env.MAIL_FROM ??
      `"OneShot Mailer" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
}