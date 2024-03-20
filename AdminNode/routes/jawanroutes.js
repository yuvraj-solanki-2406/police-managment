const express = require('express')
const markJawanAttendence = require('../controllers/jawan/jawanAttendence')
const jawanLogin = require('../controllers/jawan/jawanAuth')
const { jawanAssignedCases, jawanSingleCaseDetail } = require('../controllers/jawan/jawanCases')
const { validateLogin } = require('../utils/adminAuthValid')
const { validateJwtToken } = require('../utils/validateToken')

const router = express.Router()


router.post("/login", validateLogin, jawanLogin)
router.get("/jawancases/:id", validateJwtToken, jawanAssignedCases)
router.get("/jawansinglecases/:id", validateJwtToken, jawanSingleCaseDetail)

// Jawan Attendence
router.post("/mark_attendence", validateJwtToken, markJawanAttendence)

module.exports = router