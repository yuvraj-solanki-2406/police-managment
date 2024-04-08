const mongoose = require('mongoose')
const { Schema } = mongoose

const reserve_force = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    tenure_started: { type: Date, required: true },
    department: { type: String, required: true },
    image: { type: String }
});

const reserve_force_schema = mongoose.model('reserve_force', reserve_force);

module.exports = reserve_force_schema;