const reserveForce = require('../models/ReserveForce')

const adminViewReservePolice = async (req, res) => {
    try {
        const response = await reserveForce.find({});
        res.status(200).json({ message: "Data retrived", data: response });
    } catch (err) {
        res.status(500).json({ message: "Internal Error", error: err })
    }
};

const adminAddReservePolice = async (req, res) => {
    const user_data = req.body;
    try {
        console.log(user_data)
        const model_data = reserveForce(user_data);
        let res = await model_data.save();

        res.status(200).json({ message: "Data Retrived", data: res })
    } catch (error) {
        res.status(500).json({ message: "Internal Error", error: error })
    }
}

module.exports = { adminViewReservePolice, adminAddReservePolice }