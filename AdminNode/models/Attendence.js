const mongoose = require('mongoose')
const { Schema } = mongoose

const attendence_schema = new Schema({
    jawan_id: { type: String, required: true },
    jawan_name: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    check_in_detail: { type: Date, required: true, default: Date.now() },
    check_out_detail: {
        type: Date,
        // required: true
        // default: function () {
        //     return new Date(this.check_in_detail.getTime() + (8 * 60 * 60 * 1000));
        // }
    },
    on_leave: { type: Number, default: 0 },
});

const attendenceSchema = mongoose.model('attendence', attendence_schema);

module.exports = attendenceSchema