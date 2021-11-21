const { User } = require("../../models/user");
const { NotFound, Unauthorized } = require("http-errors");

const current = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      throw new Unauthorized();
    }
  } catch (error) {}
};
module.exports = current;
