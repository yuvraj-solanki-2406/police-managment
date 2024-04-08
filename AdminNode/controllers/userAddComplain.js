const complainModel = require('../models/Complain');
const updateModel = require('../models/Updates');

const addNewComplain = async (req, res) => {
    const formData = req.body;
    try {
        const new_complain = new complainModel({
            fullname: formData.fullname,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            com_title: formData.com_title,
            com_desc: formData.com_desc,
            com_image: formData.com_image
        });
        const response = await new_complain.save();
        res.status(200).json({ message: "Complain Registered", data: response });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error })
    }
}


const userAllNotices = async (req, res) => {
    try {
        const response = await updateModel.find({});
        res.status(200).json({ message: "All updates", data: response });
    } catch (error) {
        res.status(500).json({ message: "Internal Error", error: error })
    }
}


module.exports = { addNewComplain, userAllNotices }