const attendencemodel = require('../../models/Attendence')
const jawanModel = require('../../models/JawansModel')

const markJawanAttendence = async (req, res) => {
    const jawan_id = req.params.j_id;
    try {
        const formData = req.body

        // Create a new instance of the attendance model
        const newAttendance = new attendencemodel({
            jawan_id: formData.jawan_id,
            jawan_name: formData.jawan_name,
            check_in_detail: formData.check_in_detail,
            check_out_detail: formData.check_out_detail,
            on_leave: formData.on_leave,
        });

        let data_res = await newAttendance.save(formData)
        if (data_res) {
            res.status(200).json({ message: "Data saved", data: formData })
        } else {
            res.status(400).json({ message: "Error" })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error: error })
    }
}

module.exports = markJawanAttendence