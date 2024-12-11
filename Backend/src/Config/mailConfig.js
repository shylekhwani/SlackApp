import nodemailer from 'nodemailer';

import { MAIL_ID, MAIL_PASSWORD } from './serverConfig.js';

export const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: MAIL_ID,
      pass: MAIL_PASSWORD,
    },
  });

  /*
  https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628

------------------------- Its For Testing Configuration----------------------------------------- 

        app.listen(PORT, async () => {
        console.log('server is running on port', PORT);
        connectDB();

        const mailResponse = await transporter.sendMail({
        from: "Harshlekh@Gmail.com",
        to: "yashlekhwani49@gmail.com",
        subject: "Hello from ShyBoy",
        text: "This is a test email sent using Nodemailer.",
        });

        console.log(mailResponse)
        });
  */ 