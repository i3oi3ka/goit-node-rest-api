import { nanoid } from "nanoid";
import fs from "node:fs/promises";
import path from "node:path";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (contacts) => {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  const [removedContact] = contacts.splice(index, 1);
  console.log(removedContact);

  await updateContacts(contacts);
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function updateContact(id, payload) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...payload };
  await updateContacts(contacts);
  return contacts[index];
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
