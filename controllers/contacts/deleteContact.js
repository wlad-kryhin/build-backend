const { NotFound } = require("http-errors");
const ContactSchema = require("../../models/model");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactDelete = await ContactSchema.findByIdAndDelete(contactId);
    if (!contactDelete) {
      return NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact has been remove",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
