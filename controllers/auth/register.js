const User = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const uniqid = require("uniqid");
const sendMail = require("../../middlewares/sendMail");

const register = async (req, res) => {
  const { email, password } = req.body;
  const image = gravatar.url(email);
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email: ${email} already exist`);
  }
  const verificationToken = uniqid();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    email,
    password: hashPassword,
    avatarURL: image,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Confirmation of registration",
    html: `<a href="http://localhost:3040/api/verify/${verificationToken}"> Please, Confirm for registration</a>`,
  };
  await sendMail(mail);
  res.status(201).json({ message: "Register is success" });
};

module.exports = register;
