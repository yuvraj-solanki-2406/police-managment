const express = require('express')
const { adminLogin, adminRegister } = require('../controllers/adminAuth')
const { getAllCases, addNewCase, updateCase, deleteCase, singleCaseData } = require('../controllers/adminCases')
const { getJawanList, registerJawan, deleteJawan } = require('../controllers/adminJawan')
const { validateLogin, validateAdminRegister } = require('../utils/adminAuthValid')
const { validateJawanRegistration } = require('../utils/jawansValid')
const { validateJwtToken } = require('../utils/validateToken')

const multer = require('multer')
const { getAllCaseCategory, addCaseCategory, deleteCaseCategory, updateCaseCategory, singleCaseCategory } = require('../controllers/adminCaseCategory')
const { viewAllAttendence, viewDateWiseAttendence } = require('../controllers/adminAttendence')
const { viewAdminAllUpdates, addNewUpdate, adminViewAllComplain } = require('../controllers/adminUpdates')
const { adminViewReservePolice, adminAddReservePolice } = require('../controllers/adminReserveForce')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// });
const upload = multer({ dest: 'uploads/' })

const router = express.Router()

// Admin Auth Routes
router.post('/register', validateAdminRegister, adminRegister)
router.post('/login', validateLogin, adminLogin)

// Admin Jawan Routes
router.get("/jawans", validateJwtToken, getJawanList);
router.post("/addjawan", validateJwtToken, validateJawanRegistration, upload.single('profilePhoto'), registerJawan);
router.delete("/deletejawan", validateJwtToken, deleteJawan);

// Admin Case CRUD operations
router.get('/cases', validateJwtToken, getAllCases);
router.post('/addcase', validateJwtToken, addNewCase);
router.put('/updatecase/:id', validateJwtToken, updateCase)
router.delete('/deletecase/:id', validateJwtToken, deleteCase)
router.get('/getsinglecase/:id', validateJwtToken, singleCaseData)

// Admin Case Category
router.get('/case_category', validateJwtToken, getAllCaseCategory)
router.post('/add_case_category', validateJwtToken, addCaseCategory)
router.put('/update_case_category/:id', validateJwtToken, updateCaseCategory)
router.delete('/delete_case_category/:id', validateJwtToken, deleteCaseCategory)
router.get('/getsinglecasecate/:id', validateJwtToken, singleCaseCategory)

// Admin view all attendence
router.get("/attendence", validateJwtToken, viewAllAttendence)
// Admin date wise attendence
router.get("/attendencestatus", validateJwtToken, viewDateWiseAttendence);

// Admin Updates
router.get('/updates', validateJwtToken, viewAdminAllUpdates)
router.post('/addupdate', validateJwtToken, addNewUpdate)

// Admin View Complain
router.get('/allcomplains', validateJwtToken, adminViewAllComplain)

// Admin Reserve Force
router.get('/reservepolice', validateJwtToken, adminViewReservePolice)
router.post('/addreservepolice', validateJwtToken, adminAddReservePolice)

module.exports = router