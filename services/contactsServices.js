// import { nanoid } from "nanoid";
// import fs from "node:fs/promises";
// import path from "node:path";

import Contact from "../db/models/Contact.js";

const listContacts = () => Contact.findAll();

const addContact = (payload) => Contact.create(payload);

const getContactById = (id) => Contact.findByPk(id);

// async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) return null;

//   const [removedContact] = contacts.splice(index, 1);
//   console.log(removedContact);

//   await updateContacts(contacts);
//   return removedContact;
// }

const updateContact = async (id, payload) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.update(payload);
  return contact;
};

export {
  listContacts,
  getContactById,
  // removeContact,
  addContact,
  updateContact,
};
