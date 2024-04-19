const mongoose = require('mongoose');

const lisenceSchema = new mongoose.Schema({
    docID: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    lisenceKey: {
        type: String,
        required: true,
        unique: true
    },
    filename: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        required: true
    }
}, { collection: 'License' });

const License = mongoose.model('License', lisenceSchema)
module.exports = License;

