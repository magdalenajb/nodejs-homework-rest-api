const service = require("../service/contactsService");

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
                status: "success",
                message: "Contact fetched successfully",
                data: { findContact: result },
            });
        } else {
            res.status(404).json({
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
        const contacts = await service.listContacts();
        const isNameUnique = !contacts.some(
            (elem) => elem.name === req.body.name
        );
        if (!isNameUnique) {
            return res.status(200).json({
                status: "error",
                code: 400,
                data: {
                    message: "you already have contact with that name",
                },
            });
        } else {
            const { _id } = req.user;
            const result = await service.addContact({ ...req.body, owner: _id });
            res.status(201).json({
                status: "success",
                message: "Contact added successfully",
                data: { result },
            });
        }
    } catch (error) {
        next(error);
    }
};

const updateContact = async (req, res, next) => {
    try {
        const contactId = req.params.contactId;
        const result = await service.updateContact(contactId, req.body);
        if (result) {
            res.status(200).json({
                status: "success",
                message: "Contact updated successfully",
                data: { result },
            });
        } else {
            res.status(404).json({
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
                status: "success",
                message: "Contact removed successfully",
                data: { result },
            });
        } else {
            res.status(404).json({
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
        const { contactId } = req.params;
        const { favorite } = req.body;
		const result = await service.updateContact(contactId, { favorite }, req.body);
        if (!result) {
            return res.status(404).json({
				status: "error",
				message: "missing field favorite",
				data: "Not Found",
			});
        }

        if (result) {
            res.status(200).json({
                status: "success",
                message: 'Contact set as favourite',
                data: { result },
            });
        }

    } catch (error) {
        next(error);
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
