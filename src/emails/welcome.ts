import { baseUrl } from '@/lib/site'

export function welcomeEmail(unsubscribeUrl: string) {
  return {
    subject: "Welcome to Evan's Blog!",
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
        <tr><td style="padding:40px 40px 0">
          <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#171717">Thanks for subscribing!</h1>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#525252">
            You'll receive an email whenever I publish a new article about web development, React, TypeScript, and other topics I'm exploring.
          </p>
        </td></tr>
        <tr><td style="padding:24px 40px">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#525252">
            In the meantime, check out my latest articles:
          </p>
          <a href="${baseUrl}/articles" style="display:inline-block;padding:10px 20px;background:#171717;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:500">
            Browse articles
          </a>
        </td></tr>
        <tr><td style="padding:24px 40px 40px;border-top:1px solid #f0f0f0">
          <p style="margin:0;font-size:12px;line-height:1.5;color:#a3a3a3">
            You received this email because you subscribed to Evan's Blog.
            <a href="${unsubscribeUrl}" style="color:#a3a3a3">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  }
}
