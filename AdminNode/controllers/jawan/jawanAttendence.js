const attendencemodel = require('../../models/Attendence')
const jawanModel = require('../../models/JawansModel')


const markJawanAttendence = async (req, res) => {
    try {
        const formData = req.body
        let curr_date = formData.date;
        let j_id = formData.jawan_id;

        const ams = await attendencemodel.find({ jawan_id: j_id, date: curr_date })
        if (ams.length === 0) {
            // Create a new instance of the attendance model
            const newAttendance = new attendencemodel({
                jawan_id: formData.jawan_id,
                jawan_name: formData.jawan_name,
                date: formData.date,
                check_in_detail: formData.check_in_detail,
                check_out_detail: formData.check_out_detail,
                on_leave: formData.on_leave,
                latitude: formData.latitude,
                longitude: formData.longitude,
            });

            let data_res = await newAttendance.save(formData)
            if (data_res) {
                res.status(200).json({ message: "Attendence marked successfully", data: formData })
            } else {
                res.status(400).json({ message: "Error" })
            }
        } else {
            res.status(200).json({ message: "Attendence already marked" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error", error: error })
    }
}


const jawanMonthlyAttendence = async (req, res, month) => {
    const startDate = new Date(2024, month, 1); // First day of the month
    const endDate = new Date(2024, month + 1, 0); // Last day of the month
    const userId = req.params.id;

    try {
        const userData = await attendencemodel.aggregate([
            {
                $match: {
                    jawan_id: mongoose.Types.ObjectId(userId), // Convert user ID to ObjectId
                    date: { $gte: startDate, $lte: endDate } // Filter by date range
                }
            }
        ]);
        res.status(200).json({ message: "Attendence monthwise", data: userData })
    } catch (error) {
        console.error("Error retrieving user data:", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { markJawanAttendence, jawanMonthlyAttendence }