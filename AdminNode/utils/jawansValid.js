const Joi = require('joi')

const validateJawanRegistration = (req, res, next) => {
    const jawan_validation = Joi.object({
        fullname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).alphanum().required(),
        phone: Joi.string().min(10).max(11).required(),
        address: Joi.string().required(),
        addharCard: Joi.string().min(12).max(13),
        totalCases: Joi.number(),
        solvedCases: Joi.number(),
        pendingCases: Joi.number(),
        profilePhoto: Joi.string()
    });
    const { val, error } = jawan_validation.validate(req.body)
    if (error) {
        res.status(400).json({ message: "Validation Failed", error: error });
    } else {
        next();
    }
}

module.exports = { validateJawanRegistration }