

// stories.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storiesSchema = new Schema({
    isPaperBack: {
        type: Boolean,
    },
    title: {
        type: String,
    },
    isOnAmazon: {
        type: Boolean,
    },
    copyright: {
        type: Number,
    },
    author: {
        type: String,
    } 
});

module.exports = mongoose.model("Stories", storiesSchema);

