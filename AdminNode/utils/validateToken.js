const jwt = require('jsonwebtoken')

const validateJwtToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) {
        res.status(301).json({ message: "Unauthorized access", status: 301 })
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(decoded){
                return next()
            } else {
                res.status(400).json({ message: "Invalid Token", status: 400 });
            }
        } catch (error) {
            res.status(400).json({ message: "Internal Error", status: 400, error: error });
        }
    }
}

module.exports = { validateJwtToken }