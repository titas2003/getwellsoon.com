const otpGenerator = require('otp-generator');
const Doctor = require('../models/Doctor');
const transporter = require('../controller/mailconf');


function generateOTP() {
    // Define the characters to be used for OTP
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return otp;
}
// Endpoint to request OTP
const docEmailOTP = async(req, res) => {
    const { email } = req.body;

    try {
        // Find user by phone number
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Generate OTP
        const otp = generateOTP();
        const mailOptions = {
            from: 'nomail02024@gmail.com',
            to: email,
            subject: 'Your One Time Password for Get Well Soon login',
            text: `Your OTP is: ${otp}. \n\nDisclaimer: Please do not share this otp with anyone to maintain the security policies.\nPlease visit http://35.233.255.142:80/getwellsoon.com/Medicio/ for more details. \n\nThanks and Regards.`
        };

        // Sending the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Failed to send OTP');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('OTP sent successfully');
            }
        });


        // In a real application, you would send the OTP via SMS or emails
        console.log(`Generated OTP for user ${doctor._id}: ${otp}`);

        // Save OTP to user data
        await Doctor.updateOne({ _id: doctor._id }, { $set: { otp } });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (err) {
        console.error('Error requesting OTP:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Endpoint to verify OTP
const docEmailVerify = async(req, res) => {
    const { email, otp } = req.body;

    try {
        // Find user by phone number
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Check if OTP matches
        if (otp === doctor.otp) {

            req.session.email = email;
            req.session.phone = doctor.phone;
            req.session._id = doctor._id
            // Clear OTP after successful verification
            await Doctor.updateOne({ _id: doctor._id }, { $unset: { otp: '' } });
            console.log(req.session._id);

            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(401).json({ message: 'Invalid OTP' });
        }
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { docEmailOTP, docEmailVerify };
