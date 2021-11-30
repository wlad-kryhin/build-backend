const User = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");

const userDir = path.join(__dirname, "../../public/avatars");

const updateIMG = async (req, res) => {
  const userId = String(req.user._id);
  const { path: tempUpload, originalname } = req.file;
  try {
    const resultUpload = path.join(userDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const image = path.join("/avatars", originalname);
    await User.findByIdAndUpdate(userId, { avatarURL: image }, { new: true });
    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL: image,
      },
    });
  } catch (error) {
    fs.unlink(tempUpload);
  }
};

module.exports = updateIMG;
