const mongoose = require('mongoose')
const { Schema } = mongoose

const update_schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    vote: { type: Number, default: 0 },
    comments: { type: Array },
});

const update = mongoose.model('admin_updates', update_schema);

module.exports = update;