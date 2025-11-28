import Contact from "../db/models/Contact.js";

const listContacts = (where) => Contact.findAll({ where });

const addContact = (payload) => Contact.create(payload);

const getContactById = (where) => Contact.findOne({ where });

const removeContact = async (where) => {
  const contact = await getContactById(where);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

const updateContact = async (where, payload) => {
  const contact = await getContactById(where);
  if (!contact) return null;
  await contact.update(payload);
  return contact;
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
