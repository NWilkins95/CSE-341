const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const contactsController = {};

contactsController.getAll = async (req, res) => {
  try {
    const contacts = await mongodb.getDb().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

contactsController.getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = await mongodb.getDb().collection('contacts').findOne({ _id: contactId });
    if (contact) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (err) {
    console.error("Error fetching contact:", err);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
};

module.exports = contactsController;