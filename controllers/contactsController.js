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

contactsController.createNewContact = async (req, res) => {
  try {
    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // make sure all fields are provided
    if (!newContact.firstName || !newContact.lastName || !newContact.email || !newContact.favoriteColor || !newContact.birthday) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await mongodb.getDb().collection('contacts').insertOne(newContact);
    res.status(201).json({id: result.insertedId});
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(500).json({ error: "Failed to create contact" });
  }
};

contactsController.updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Make sure all fields are provided
    if (!updatedContact.firstName || !updatedContact.lastName || !updatedContact.email || !updatedContact.favoriteColor || !updatedContact.birthday) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await mongodb.getDb().collection('contacts').updateOne({ _id: contactId }, { $set: updatedContact });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Error updating contact:", err);
    res.status(500).json({ error: "Failed to update contact" });
  }
};

contactsController.deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: contactId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).send();
  } catch (err) {
    console.error("Error deleting contact:", err);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

module.exports = contactsController;