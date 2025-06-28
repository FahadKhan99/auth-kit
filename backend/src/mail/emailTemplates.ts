export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f3f3f3;">
  <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Verify Your Email</h1>
    </div>
    <div style="padding: 20px; font-size: 16px;">
      <p>Hello,</p>
      <p>Thank you for signing up for ClearNotes! To complete your registration, please use the verification code below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
      </div>
      <p>Enter this code on the verification page to finish setting up your account.</p>
      <p style="font-weight: bold; color: #e74c3c;">Note: This verification code will expire in 15 minutes for security reasons.</p>
      <p>If you did not sign up for an account with us, you can safely ignore this email.</p>
      <p>Best regards,<br>ClearNotes Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message. Please do not reply to this email.</p>
      <p style="font-size: 12px; color: #aaa;">If you have any questions, feel free to contact our support team at <a href="mailto:support@clearnotes.com" style="color: #888; text-decoration: none;">support@clearnotes.com</a>.</p>
    </div>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7fa;">
  <div style="max-width: 600px; margin: 30px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <!-- Header Section -->
    <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 30px; font-weight: bold;">Welcome to ClearNotes!</h1>
    </div>

    <!-- Body Section -->
    <div style="padding: 30px; font-size: 16px; color: #555; line-height: 1.6;">
      <p style="font-size: 18px; color: #333;">Hello {name},</p>
      <p>We're excited to have you as part of the ClearNotes community. Whether you're here to organize your tasks, jot down ideas, or simply stay on top of your productivity, we're here to support you every step of the way.</p>

      <p>Here's a quick look at some of the features you'll love:</p>
      <ul style="padding-left: 20px; font-size: 16px; color: #555; list-style: none;">
        <li style="margin-bottom: 10px; font-size: 16px;">🔐 <strong>Secure note-taking</strong> to keep your ideas safe.</li>
        <li style="margin-bottom: 10px; font-size: 16px;">✅ <strong>Task and to-do management</strong> for your busy life.</li>
        <li style="margin-bottom: 10px; font-size: 16px;">💻 <strong>Sync across devices</strong> to stay organized wherever you go.</li>
      </ul>

      <p>If you have any questions or feedback, don’t hesitate to <strong>reach out</strong>. We’re always happy to help!</p>
      <p>Again, welcome aboard! We’re thrilled to see you start your journey with ClearNotes.</p>

      <p style="color: #777; font-size: 14px;">Best regards,<br><strong>The ClearNotes Team</strong></p>
    </div>

    <!-- Footer Section -->
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p style="color: #888;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;
export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7fa;">
  <div style="max-width: 600px; margin: 30px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <!-- Header Section -->
    <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 30px; font-weight: bold;">Password Reset Successful</h1>
    </div>

    <!-- Body Section -->
    <div style="padding: 30px; font-size: 16px; color: #555; line-height: 1.6;">
      <p style="font-size: 18px; color: #333;">Hello {name},</p>
      <p>Your password has been successfully reset! We're glad to inform you that your account is now secured with the new password.</p>

      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
          ✓
        </div>
      </div>

      <p>If you did not initiate this password reset, please <strong>contact our support team</strong> immediately for assistance.</p>
      
      <p>For added security, we recommend the following:</p>
      <ul style="padding-left: 20px; font-size: 16px; color: #555; list-style: none;">
        <li style="margin-bottom: 10px;">🔑 <strong>Use a strong, unique password</strong> to protect your account.</li>
        <li style="margin-bottom: 10px;">🔒 <strong>Enable two-factor authentication</strong> if available.</li>
        <li style="margin-bottom: 10px;">🚫 <strong>Avoid reusing passwords</strong> across multiple websites or services.</li>
      </ul>

      <p>Thank you for helping us keep your account secure!</p>
      <p style="color: #777; font-size: 14px;">Best regards,<br><strong>The ClearNotes Team</strong></p>
    </div>

    <!-- Footer Section -->
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p style="color: #888;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your ClearNotes Password</title>
</head>
<body style="font-family: 'Roboto', Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f4f7fa;">
  <div class="container" style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); overflow: hidden;">
    <div class="header" style="background-color: #4CAF50; padding: 25px 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Password Reset</h1>
    </div>
    <div class="content" style="padding: 30px;">
      <p style="margin-bottom: 15px; font-size: 16px; color: #555555;">Hello {name},</p>
      <p style="margin-bottom: 15px; font-size: 16px; color: #555555;">We received a request to reset the password for your ClearNotes account. If you did not make this request, please ignore this email.</p>
      <p style="margin-bottom: 15px; font-size: 16px; color: #555555;">To proceed with your password reset, please click the button below:</p>
      <div class="button-container" style="text-align: center; margin: 30px 0 40px 0;">
        <a href="{resetURL}" style="display: inline-block; background-color: #4CAF50; color: #ffffff !important; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 18px; transition: background-color 0.2s ease;">Reset Password</a>
      </div>
      <p style="margin-bottom: 15px; font-size: 16px; color: #555555;">This link is valid for <strong style="font-weight: 700;">1 hour</strong> for security purposes. After this time, you will need to request a new password reset link.</p>
      <p style="margin-bottom: 15px; font-size: 16px; color: #555555;">If you have any questions or did not initiate this request, please contact our support team immediately.</p>
      <p style="margin-bottom: 15px; font-size: 16px; color: #555555;">Best regards,<br>The ClearNotes Team</p>
    </div>
    <div class="footer" style="text-align: center; padding: 20px 30px; color: #888888; font-size: 13px; border-top: 1px solid #eeeeee; margin-top: 20px;">
      <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
      <p style="margin: 0;">&copy; 2025 ClearNotes. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
