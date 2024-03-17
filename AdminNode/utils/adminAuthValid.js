const Joi = require('joi')

const validateAdminLogin = (req, res, next) => {
    const Schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });
    const { error, value } = Schema.validate(req.body)
    if (error) {
        res.status(400).json({ message: error })
    } else {
        next();
    }
}

const validateAdminRegister = (req, res, next) => {
    const Schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        phone: Joi.string().min(10).max(10).required(),
    });
    const { error, value } = Schema.validate(req.body)
    if (error) {
        res.status(400).json({ message: error })
    } else {
        next();
    }
}

module.exports = { validateAdminLogin, validateAdminRegister }
