const User = require("../../models/user");
const { NotFound, Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound(`User with email = ${email} not found`);
  }
  const compareResult = bcrypt.compareSync(password, user.password);
  if (!compareResult) {
    throw new Unauthorized("Password wrong");
  }
  if (!user.verify) {
    throw new NotFound("No verify");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    code: 200,
    status: "success",
    data: {
      token,
    },
  });
};
module.exports = login;
