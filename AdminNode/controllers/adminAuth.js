const express = require('express')
const app = express()
const adminModel = require('../models/AdminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Admin Register
const adminRegister = async (req, res) => {
    const model = adminModel(req.body);
    model.password = await bcrypt.hash(req.body.password, 10)

    try {
        const save_response = await model.save()
        save_response.password = undefined;
        res.status(200).json({ message: "Data added successfully", data: save_response })
    } catch (error) {
        res.status(500).json({ message: "Some Error occured", status: 500 })
    }
}

const adminLogin = async (req, res) => {
    try {
        const user = await adminModel.findOne({ email: req.body.email });
        if (user) {
            const ispasswordMatch = await bcrypt.compare(req.body.password, user.password)
            if (ispasswordMatch) {
                const jwtObject = { _id: user._id, name: user.name, email: user.email };
                const jwtToken = jwt.sign(jwtObject, process.env.JWT_SECRET, { expiresIn: '5h' });
				
                return res.status(200).json({ message: "Login successfully", jwtToken, status: 200, user_data: user })
            } else {
                return res.status(400).json({ message: "Invalid Password", status_code: 400 })
            }
        } else {
            return res.status(400).json({ message: "Invalid Email", status_code: 400 })
        }
    } catch {
        return res.status(400).json({ message: "Some internal error", status_code: 400 })
    }

}

module.exports = { adminRegister, adminLogin }