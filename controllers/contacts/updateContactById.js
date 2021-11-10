const ContactSchema = require("../../models/model");
const { NotFound } = require("http-errors");

const updateContactById = async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    if (!body) {
      return NotFound(`Missing fields`);
    }
    const { contactId } = req.params;
    const upContact = await ContactSchema.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!upContact) {
      return NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        upContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
