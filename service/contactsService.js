const Contact = require('./schemas/contactSchema');

const listContacts = async () => {
    return Contact.find();
};

const getContactById = async (id) => {
    return Contact.findOne({ _id: id });
};

//const addContact = async ({ name, phone, email, owner }) => {
//    return Contact.create({ name, phone, email, owner });
//};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

//const updateContact = async (id, fields) => {
//    return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
//};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

//const removeContact = async (id) => {
//    return Contact.findByIdAndRemove({ _id: id });
//};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

//const updateStatusContact = async (id, body) => {
//    return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
//};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};


module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
    updateStatusContact,
};