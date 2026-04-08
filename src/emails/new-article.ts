export function newArticleEmail({
  title,
  description,
  articleUrl,
  unsubscribeUrl,
}: {
  title: string
  description: string
  articleUrl: string
  unsubscribeUrl: string
}) {
  return {
    subject: `New Article: ${title}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
        <tr><td style="padding:40px 40px 0">
          <p style="margin:0 0 4px;font-size:13px;font-weight:500;color:#a3a3a3;text-transform:uppercase;letter-spacing:0.05em">New article</p>
          <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#171717;line-height:1.3">${title}</h1>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#525252">${description}</p>
        </td></tr>
        <tr><td style="padding:24px 40px">
          <a href="${articleUrl}" style="display:inline-block;padding:10px 20px;background:#171717;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:500">
            Read article
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
