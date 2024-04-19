const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const doctReg = require('./routes/doctorAuth');
const cors = require('cors');
const session = require('express-session');
const { requestemailOTP, verifyemailOTP } = require('./routes/Otpmail');
const { docEmailOTP, docEmailVerify } = require('./routes/otpDoc');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

//setting session secter key:

app.use(session({
    secret: 'your_secret_key', // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: false
}));

// Middleware
app.use(express.json());
app.get('/', (req, res) => {
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
app.use('/auth/genDocOtp', docEmailOTP);
app.use('/auth/verifyDocOtp', docEmailVerify);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
