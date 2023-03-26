const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    user_id:String,
    productKey:String,
})

// token used for reset the password

module.exports = mongoose.model('ProductKey', productSchema);