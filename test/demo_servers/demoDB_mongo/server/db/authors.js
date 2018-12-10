
// authors.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorsSchema = new Schema({
    hasPublished: {
        type: Boolean,
    },
    stories: {
        type: [String],
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    location: {
        type: String,
    } 
});

module.exports = mongoose.model("Authors", authorsSchema);

