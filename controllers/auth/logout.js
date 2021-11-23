const User = require("../../models/user");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findById(_id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error.message);
  }
};
module.exports = logout;
