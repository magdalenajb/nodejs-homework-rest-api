const service = require("../service/contactsService");
const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const listContacts = async (req, res, next) => {
  try {
    const contacts = await service.listContacts();
    res.status(200).json({
      method: req.method,
      endpoint: req.originalUrl,
      status: "success",
      message: "Contacts fetched successfully",
      data: { contacts: contacts },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await service.getContactById(contactId);
    if (result) {
      res.status(200).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: "success",
        message: "Contact fetched successfully",
        data: { findContact: result },
      });
    } else {
      res.status(404).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: "error",
        message: `Not found Contact with id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error, value } = joiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: "error",
        message: error.details[0].message,
      });
    }

    const contacts = await service.listContacts();
    const isNameUnique = !contacts.some((elem) => elem.name === req.body.name);
    if (!isNameUnique) {
      return res.status(200).json({
        status: "error",
        code: 400,
        data: {
          message: "you already have contact with that name",
        },
      });
    } else {
      const result = await service.addContact(value);
      res.status(201).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: "success",
        message: "Contact added successfully",
        data: { addedContact: result },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { error, value } = joiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: "error",
        message: error.details[0].message,
      });
    }

    const result = await service.updateContact(contactId, value);
    if (result) {
      res.status(200).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: "success",
        message: "Contact updated successfully",
        data: { updated: result },
      });
    } else {
      res.status(404).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: "error",
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await service.removeContact(contactId);
    if (result) {
      res.status(200).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: "success",
        message: "Contact removed successfully",
        data: { deletedContact: result },
      });
    } else {
      res.status(404).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: "error",
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const validation = favoriteJoiSchema.validate(req.body);
    if (validation.error) {
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    }
    const contactId = req.params.contactId;
    const result = await service.updateContact(contactId, req.body);
    if (!result) {
      return res.status(404).json({
        status: "error",
        message: "missing field favorite",
        data: "Not Found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Contact set as favourite",
      data: { updated: result },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unexpected error",
    });
  }
};

module.exports = {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
