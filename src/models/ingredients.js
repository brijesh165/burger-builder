var mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
});

module.exports = mongoose.model('ingredients', ingredientsSchema);
