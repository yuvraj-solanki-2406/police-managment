const express = require('express')
const { adminLogin, adminRegister } = require('../controllers/adminAuth')
const { getAllCases, addNewCase, updateCase, deleteCase, singleCaseData } = require('../controllers/adminCases')
const { getJawanList, registerJawan } = require('../controllers/adminJawan')
const { validateAdminLogin, validateAdminRegister } = require('../utils/adminAuthValid')
const { validateJawanRegistration } = require('../utils/jawansValid')
const { validateJwtToken } = require('../utils/validateToken')

const multer = require('multer')
const { getAllCaseCategory, addCaseCategory, deleteCaseCategory, updateCaseCategory, singleCaseCategory } = require('../controllers/adminCaseCategory')

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
router.post('/login', validateAdminLogin, adminLogin)

// Admin Jawan Routes
router.get("/jawans", validateJwtToken, getJawanList);
router.post("/addjawan", validateJwtToken, validateJawanRegistration, upload.single('profilePhoto'), registerJawan);

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


module.exports = router