const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Liscense = require('../../models/doctor_prof/License');
const Doctor = require('../../models/Doctor');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/doc_doc/');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4()); // Generate unique filename
    }
});
const upload = multer({ storage });

router.post('/upload-lisence', upload.single('file'), async(req,res) => {
    if(!req.session._id) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const _id = req.session._id;
    const doctor = await Doctor.findOne({_id});

    const newLisence = new Liscense({
        docID: _id,
        username: doctor.username,
        email: doctor.email,
        phone: doctor.phone,
        lisenceKey: req.body.lisenceKey,
        filename: req.file.filename,
        filepath: req.file.filepath,
    })
    await newLisence.save();
    res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
})

module.exports = router;