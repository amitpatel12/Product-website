const mongoose = require('mongoose');
const macSchema = new mongoose.Schema({
    productKey:String,
    mac:String
})

// token used for reset the password

module.exports = mongoose.model('mac', macSchema);