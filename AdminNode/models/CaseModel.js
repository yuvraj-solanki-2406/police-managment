const mongoose = require('mongoose')
const { Schema } = mongoose

const caseSchema = new Schema({
    title: { type: String, required: true },
    caseCategory: { type: String, required: true },
    location: { type: String, required: true },
    dateTime: { type: Date, required: true, default: Date.now() },
    assignedJawan: { type: String, required: true },
    chargeTakenDateTime: { type: String, default: Date.now() },
    caseRecords: [],
    completed: { type: String, default: '0' },
    remarks: { type: String }
});

const cases = mongoose.model('case', caseSchema);
module.exports = cases