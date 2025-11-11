import * as contactsServices from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsServices.listContacts();

  res.json(contacts);
};

export const getOneContact = async (req, res) => {};

export const deleteContact = async (req, res) => {};

export const createContact = async (req, res) => {};

export const updateContact = async (req, res) => {};
