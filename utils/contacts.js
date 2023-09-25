const fs = require("fs")

const dataDir = "./data"
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir)
}

const dataPath = "./data/contacts.json"
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8")
}

const loadKontak = () => {
  const fb = fs.readFileSync("data/contacts.json", 'utf-8')
  const contacts = JSON.parse(fb)

  return contacts
}

const findContact = (nama) => {
  const contacts = loadKontak()
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  )

  return contact
}

// Menulis / Timpa dengan data baru
const saveContact = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts))
}

const addContact = (contact) => {
  const contacts = loadKontak()
  contacts.push(contact)

  saveContact(contacts)

}

const cekDuplikat = (nama) => {
  const contacts = loadKontak()
  return contacts.find((contact) => contact.nama === nama)
}

const deleteContact = (nama) => {
  const contacts = loadKontak()
  const filterContact = contacts.filter((contact) => contact.nama != nama)

  saveContact(filterContact)
}

const updateContact = (kontakBaru) => {
  const contacts = loadKontak()
  const filterContact = contacts.filter((contact) => contact.nama !== kontakBaru.oldName)

  delete kontakBaru.oldName
  filterContact.push(kontakBaru)

  saveContact(filterContact)
}

module.exports = {
  loadKontak,
  deleteContact,
  cekDuplikat,
  findContact,
  addContact,
  updateContact
}