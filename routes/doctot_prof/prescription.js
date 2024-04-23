const express = require('express');
const router = express.Router();
const Doctor = require('../../models/Doctor');
const Appointment = require('../../models/Appointment');

router.post('/prescribe/:appoId', async (req, res) => {
    try {
        if (!req.session._id) {
            return res.status(401).json({ message: 'Unaothorized Doctor' });
        }
        const _id = req.session._id;
        const appoId = req.params.appoId;
        console.log(appoId);
        const appointment = await Appointment.findOne({ appoId });
        if (!appointment) {
            return res.status(404).json({ message: `Appointment ${appoId} not found` });
        }
        const { medicines } = req.body;
        if (!medicines || !Array.isArray(medicines)) {
            return res.status(400).json({ message: 'Invalid or missing medicines data' });
        }
        appointment.medicine = appointment.medicine || [];
        appointment.medicine.push(...medicines);
        await appointment.save();

        res.status(200).json({ message: `Medicines updated succesfully for ${appoId}` });
    } catch(error) {
        console.log('Error adding medicines',error);
        res.status(500).json({ message: `Failed to add medicines` });
    }
});

module.exports = router;