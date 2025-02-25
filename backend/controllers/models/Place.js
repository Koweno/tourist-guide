const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    }
});

module.exports = mongoose.model("Place", placeSchema);