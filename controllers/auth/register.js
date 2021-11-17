const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email: ${email} already exist`);
  }
  const newUser = await User.create({ email, password });
  res.status(201).json({ message: "Register is success" });
};

module.exports = register;
