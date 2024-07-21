import nodemailer from "nodemailer";

const emailService = process.env.EMAIL_SERVICE;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: emailService,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export const sendEmail = async (mailConfig: any) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailConfig, (err: Error | null, info: any) => {
      if (err) {
        reject(err);
      }

      resolve(info);
    });
  });
};
