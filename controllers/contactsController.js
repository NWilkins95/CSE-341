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

contactsController.createContact = async (req, res) => {
  try {
    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    if (!newContact.firstName || !newContact.lastName || !newContact.email || !newContact.favoriteColor || !newContact.birthday) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await mongodb.getDb().collection('contacts').insertOne(newContact);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(500).json({ error: "Failed to create contact" });
  }
};

module.exports = contactsController;