const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalname: String,
    filename: String,
    path: String
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
