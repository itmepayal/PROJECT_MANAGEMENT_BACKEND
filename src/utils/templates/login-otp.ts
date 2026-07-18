export const loginOTPTemplate = (name: string, otp: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Verification Code - Gravity</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <tr>
            <td align="center"
              style="background:linear-gradient(135deg,#2563eb,#4f46e5);padding:40px;color:#ffffff;">
              <div style="font-size:48px;margin-bottom:10px;">🔐</div>
              <h1 style="margin:0;font-size:32px;font-weight:bold;">Gravity</h1>
              <p style="margin:10px 0 0;font-size:16px;opacity:0.95;">Project & Task Management Platform</p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0;color:#111827;font-size:26px;">Hello, ${name} 👋</h2>

              <p style="margin-top:25px;font-size:16px;line-height:28px;color:#4b5563;">
                We noticed a login attempt on your <strong>Gravity</strong> account.
              </p>

              <p style="font-size:16px;line-height:28px;color:#4b5563;">
                Use the verification code below to complete your login.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:35px 0;">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;padding:18px 40px;border:2px dashed #2563eb;border-radius:12px;background:#eff6ff;">
                      <div style="font-size:38px;font-weight:bold;letter-spacing:10px;color:#2563eb;">
                        ${otp}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <div style="background:#fff7ed;border-left:5px solid #f59e0b;padding:18px;border-radius:8px;color:#92400e;font-size:15px;line-height:24px;">
                ⏳ <strong>This code is valid for 10 minutes.</strong>
                <br>
                Please do not share this code with anyone.
              </div>

              <div style="background:#fef2f2;border-left:5px solid #ef4444;padding:18px;border-radius:8px;color:#991b1b;font-size:15px;line-height:24px;margin-top:20px;">
                🚨 <strong>Wasn't you?</strong>
                <br>
                If you didn't attempt to log in, please change your password immediately and contact our support team.
              </div>

              <p style="margin-top:35px;font-size:15px;line-height:26px;color:#6b7280;">
                For your security, never share this code with anyone — including Gravity staff.
                We will never ask you for your password or this code.
              </p>

              <p style="margin-top:35px;font-size:16px;color:#111827;">
                Best Regards,
                <br />
                <strong>Gravity Team</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:30px;background:#f9fafb;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:15px;color:#4b5563;font-weight:bold;">Gravity</p>
              <p style="margin:10px 0 0;font-size:13px;color:#6b7280;">Plan • Collaborate • Track • Deliver</p>
              <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} Gravity. All rights reserved.</p>
              <p style="margin:8px 0 0;font-size:12px;color:#9ca3af;">This is an automated email from Gravity. Please do not reply to this message.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};
