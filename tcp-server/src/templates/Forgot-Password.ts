export const ForgotPassword = (otp, user) => {
  const year = new Date().getFullYear();
  return `
  <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>OTP Verification</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333333;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border: 1px solid #dddddd;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 10px 0;
                }
                .header img {
                    max-width: 100px;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                    background-color: #e9ecef;
                    display: inline-block;
                    padding: 10px 20px;
                    border-radius: 5px;
                    letter-spacing: 2px;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    padding: 20px 0;
                    font-size: 12px;
                    color: #aaaaaa;
                }
                p {
                    line-height: 1.75;
                }
            </style>
        </head>
        <body>
            <div class="container">
            <div class="header">
                <img src="logo.png" alt="Company Logo" />
            </div>
            <div class="content">
                <h1>OTP Verification</h1>
                <p>Dear ${user},</p>
                <p>Your One-Time Password (OTP) for verification is:</p>
                <div class="otp">${otp}</div>
                <p>
                Please enter this OTP to complete your verification process.
                <br />This OTP is valid for 15 minutes. <br />
                If you did not request this OTP, please ignore this email or contact
                support.
                </p>
            </div>
            <div class="footer">
                <p>&copy; ${year} Company Name. All rights reserved.</p>
            </div>
            </div>
        </body>
    </html>
`;
};

