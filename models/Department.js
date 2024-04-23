const mongoose = require('mongoose')

const deptSchema = new mongoose.Schema({
    department: {
        type: String,
        require: true,
        unique: true
    }
}, { collection: 'Departments' });

const Department = mongoose.model('Department', deptSchema);
module.exports = Department;