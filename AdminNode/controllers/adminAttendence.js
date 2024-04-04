const attendenceModel = require('../models/Attendence')

const viewAllAttendence = async (req, res) => {
    try {
        const attendence_data = await attendenceModel.find({})

        res.status(200).json({ message: "All attendence", data: attendence_data })
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err })
    }
}

// View Date wise attendence of Jawans
const viewDateWiseAttendence = async (req, res) => {
    let curr_date = req.query.curr_date;
    try {
        // Ensure curr_date is parsed into a Date object
        curr_date = new Date(curr_date);
        curr_date.setUTCHours(0, 0, 0, 0);

        // Calculate the end of the day
        const endOfDay = new Date(curr_date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const response = await attendenceModel.find({
            date: { $gte: curr_date, $lt: endOfDay }
        });

        res.status(200).json({ message: "Date wiseattendence", res: response })

    } catch (err) {
        res.status(500).json({ message: "Internal Error", error: err });
    }

}



module.exports = { viewAllAttendence, viewDateWiseAttendence }