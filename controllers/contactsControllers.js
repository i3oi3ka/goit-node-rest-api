import HttpError from "../helpers/HttpError.js";
import * as contactsServices from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const contacts = await contactsServices.listContacts({ owner });
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsServices.getContactById({ id, owner });

  if (!contact) {
    throw HttpError(404, `Not found`);
  }
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const deletedContact = await contactsServices.removeContact({ id, owner });
  if (!deletedContact) {
    throw HttpError(404, `Not found`);
  }
  res.json(deletedContact);
};

export const createContact = async (req, res) => {
  const { id: owner } = req.user;
  console.log(req.user);

  const newContact = await contactsServices.addContact({ ...req.body, owner });
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const updatedContact = await contactsServices.updateContact(
    { id, owner },
    req.body
  );
  if (!updatedContact) {
    throw HttpError(404, `Not found`);
  }
  res.json(updatedContact);
};
