const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "image", required: false },
});

const adminModel = mongoose.model('admin', schema);

module.exports = adminModel;