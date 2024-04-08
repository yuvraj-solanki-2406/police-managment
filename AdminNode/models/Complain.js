const mongoose = require('mongoose')
const { Schema } = mongoose

const complain_schema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    com_title: { type: String },
    com_desc: { type: String },
    com_image: { type: String },
});

const complain = mongoose.model('user_omplains', complain_schema);

module.exports = complain;