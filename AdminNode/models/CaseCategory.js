const mongoose = require('mongoose')
const { Schema } = mongoose;

const caseCategory = new Schema({
    title: { type: String, required: true },
    preference: { type: String, default: 'Medium' },
});

const caseModel = mongoose.model('CaseCategory', caseCategory);

module.exports = caseModel