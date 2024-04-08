const updateModel = require('../models/Updates')
const complainModel = require('../models/Complain')

const viewAdminAllUpdates = async (req, res) => {
    try {
        const response = await updateModel.find({});
        res.status(200).json({ message: "All updates", data: response });
    } catch (error) {
        res.status(500).json({ message: "Internal Error", error: error })
    }
}

const addNewUpdate = async (req, res) => {
    const formData = req.body;
    try {
        if (formData) {
            const user_data = updateModel(formData);
            const response = await user_data.save();

            res.status(200).json({ message: "Information Saved", data: response });
        } else {
            res.status(400).json({ message: "No Input Data" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Error", error: error })
    }
}

const adminViewAllComplain = async (req, res) => {
    try {
        const response = await complainModel.find({}).sort({ _id: -1 });
        res.status(200).json({ message: "All updates", data: response });
    } catch (error) {
        res.status(500).json({ message: "Internal Error", error: error })
    }
}

module.exports = { viewAdminAllUpdates, addNewUpdate, adminViewAllComplain }