const mongoose = require('mongoose')
const { Schema } = mongoose;

const jawanModel = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, requied: true, min: 6, max: 20 },
    phone: { type: Number, required: true, min: [10, 'Number should be of 10 digits'] },
    address: { type: String, requied: true, default: "Bhopal Madhya Pradesh" },
    addharCard: { type: Number },
    totalCases: { type: Number },
    solvedCases: { type: Number },
    pendingCases: { type: Number },
    profilePhoto: { type: String }
});

const jawan = mongoose.model('jawan', jawanModel);

module.exports = jawan;