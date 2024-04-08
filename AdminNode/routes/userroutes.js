const express = require('express')
const { userAllNotices, addNewComplain } = require('../controllers/userAddComplain')

const user_router = express.Router()

user_router.get('/notices', userAllNotices)
user_router.post('/addcomplain', addNewComplain)


module.exports = user_router