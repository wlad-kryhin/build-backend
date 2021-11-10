const ContactSchema = require("../../models/model");
const { NotFound } = require("http-errors");

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    // if (!favorite) {
    //   res.status(400).json({
    //     message: "missing field favorite",
    //   });
    // }
    const contact = await ContactSchema.findByIdAndUpdate(id, favorite, {
      new: true,
    });
    // if (!contact) {
    //   return NotFound(
    //     `Contact with ${contactID} not found . Please try to update other contact.`,
    //   );
    // }
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
