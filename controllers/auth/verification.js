const User = require("../../models/user");
const { NotFound } = require("http-errors");
const sendMail = require("../../middlewares/sendMail");
const verification = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.json({ message: "missing required field email" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound("User not found");
  }
  const mail = {
    to: email,
    subject: "Repeat confirmation of registration",
    html: `<a href="http://localhost:3040/api/verify/${user.verificationToken}"> Please, Confirm for registration</a>`,
  };

  user.verify
    ? res.json({ message: "Verification has already been passed" })
    : await sendMail(mail);
};

module.exports = verification;
