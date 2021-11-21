const ContactSchema = require("../../models/model");

const addContact = async (req, res, next) => {
  try {
    const newContact = { ...req.body, owner: req.user._id };
    const body = req.body;
    if (!("favorite" in body)) {
      body.favotire = false;
    }
    const contact = await ContactSchema.create(newContact);
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
