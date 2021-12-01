const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_KEY } = process.env;
sgMail.setApiKey(SENDGRID_KEY);

const sendMail = async (data) => {
  const email = { ...data, from: "wladkrychin@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendMail;
