import nodemailer from "nodemailer";

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465, // 25, 465, 887, 2525
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendMail = (payload) => {
  const email = { ...payload, from: UKR_NET_EMAIL };
  return transporter.sendMail(email);
};

export default sendMail;
