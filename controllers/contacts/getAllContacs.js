const ContactSchema = require("../../models/model");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await ContactSchema.find();
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
