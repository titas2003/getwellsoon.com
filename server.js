const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const doctReg = require('./routes/doctorAuth');
const cors = require('cors');
const { requestemailOTP, verifyemailOTP } = require('./routes/Otpmail');


const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
// Middleware
app.use(express.json());
app.get('/', (req,res) => {
	res.send("Thank you for reaching us...");
})
// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@getwellclust-01.yzq0kba.mongodb.net/getwell-db-01')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Routes
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/docauth', doctReg);
app.use('/auth/otpreq', requestemailOTP);
app.use('/auth/verifyotp', verifyemailOTP);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
