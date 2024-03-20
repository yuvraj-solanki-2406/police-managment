const jawanModel = require('../../models/JawansModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jawanLogin = async (req, res) => {
    try {
        const user = await jawanModel.findOne({ email: req.body.email });
        if (user) {
            const ispasswordMatch = await bcrypt.compare(req.body.password, user.password)
            if (ispasswordMatch) {
                const jwtObject = { _id: user._id, name: user.name, email: user.email };
                const jwtToken = jwt.sign(jwtObject, process.env.JWT_SECRET, { expiresIn: '5h' });

                return res.status(200).json({ message: "Login successfully", jwtToken, role: "jawan", user_data: user })
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

module.exports = jawanLogin