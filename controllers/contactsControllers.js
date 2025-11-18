import HttpError from "../helpers/HttpError.js";
import * as contactsServices from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsServices.listContacts();
  res.json(contacts);
};

// export const getOneContact = async (req, res) => {
//   const { id } = req.params;
//   const contact = await contactsServices.getContactById(id);

//   if (!contact) {
//     throw HttpError(404, `Not found`);
//   }
//   res.json(contact);
// };

// export const deleteContact = async (req, res) => {
//   const { id } = req.params;
//   const deletedContact = await contactsServices.removeContact(id);
//   if (!deletedContact) {
//     throw HttpError(404, `Not found`);
//   }
//   res.json(deletedContact);
// };

export const createContact = async (req, res) => {
  const newContact = await contactsServices.addContact(req.body);
  res.status(201).json(newContact);
};

// export const updateContact = async (req, res) => {
//   const { id } = req.params;
//   const updatedContact = await contactsServices.updateContact(id, req.body);
//   if (!updatedContact) {
//     throw HttpError(404, `Not found`);
//   }
//   res.json(updatedContact);
// };
