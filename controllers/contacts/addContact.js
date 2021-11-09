const ContactSchema = require("../../models/model");

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const contact = await ContactSchema.create(body);
    res.json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
