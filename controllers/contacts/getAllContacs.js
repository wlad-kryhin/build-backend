const ContactSchema = require("../../models/model");

const getAllContacts = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { _id } = req.user;
    const skip = (page - 1) * limit;
    const contacts = await ContactSchema.find({ owner: _id }, "_id name ", {
      skip,
      limit: +limit,
    }).populate("owner", "_id name email phone favorite owner");
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
