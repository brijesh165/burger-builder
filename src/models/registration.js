var mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String}
});

module.exports = mongoose.model('Registration', registrationSchema);
