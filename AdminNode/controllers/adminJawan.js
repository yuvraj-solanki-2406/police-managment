const jawanModel = require('../models/JawansModel.js')
const bcrypt = require('bcrypt')

// Get all Jawan in a list
const getJawanList = async (req, res) => {
    const jawanlist = await jawanModel.find({})

    res.status(200).json({ message: "Jawan List", data: jawanlist });
}

// Register a new Jawan
const registerJawan = async (req, res) => {
    const user_data = req.body
    const file_name = req
    console.log("file_name is " , file_name, "user data is ", user_data)
    const jawan_model = jawanModel(user_data)
    jawan_model.password = await bcrypt.hash(req.body.password, 10)

    try {
        const response = await jawan_model.save();
        res.status(200).json({ status: 200, message: "Jawan added succesfully", response: response });
    } catch (error) {
        res.status(500).json({ message: "Internal Error", error: error })
    }
}


module.exports = { getJawanList, registerJawan }