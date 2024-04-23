const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

router.post('/book-doc', async(req,res) => {
    if(!req.session._id) {
        return res.status(401).json({message: 'Unauthorized Patient'});
    }

    const _id = req.session._id;
    const patient = await Patient.findOne({_id});

    const newAppo = new Appointment({
        pname: patient.username,
        pdob: req.body.dob,
        dname: req.body.dname,
        dept: req.body.dept,
        issue: req.body.issue,
        appotime: req.body.appotime,
    })

    await newAppo.save();
    res.status(200).json({ message: 'Appointment booked' });
})

module.exports = router;