var mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    ingredients: {type: Object},
    price: {type: String},
    orderData: {type: Object},
    userId: {type: String},
});

module.exports = mongoose.model('Order', orderSchema);
