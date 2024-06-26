const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, "Image URL is required!!!"]
    },
    petName: {
        type: String,
        required: [true, "Pet name is needed!!!"],
        minLength: [3, "Pet name must be at least 3 characters long!!!"]
    },
    petType: {
        type: String,
        required: [true, "Please indicate type of pet!!!"],
        minLength: [3, "Pet type must be at least 3 characters long!!!"]
    },
    petDescription: {
        type: String,
        required: [true, "Please describe your pet!!!"],
        minLength: [3, "Pet description must be at least 3 characters long!!!"]
    }
}, { timestamps: true });

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
