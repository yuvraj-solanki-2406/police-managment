const attendenceModel = require('../models/Attendence')

const viewAllAttendence = async (req, res) => {
    try {
        const attendence_data = await attendenceModel.find({})

        res.status(200).json({ message: "All attendence", data: attendence_data })
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err })
    }
}


module.exports = viewAllAttendence