const caseModel = require('../models/CaseModel')

// Get all Case lsit
const getAllCases = async (req, res) => {

    try {
        const response = await caseModel.find()
        // response.then()
        res.status(200).json({ status: 200, data: response })
    } catch (error) {
        res.status(500).json({ status: 500, message: `Internal Error ${error}` })
    }
}

// Add new Case
const addNewCase = async (req, res) => {
    const user_data = caseModel(req.body)
    try {
        const response = await user_data.save()
        res.status(200).json({ status: 200, message: "Data added successfully", response: response })
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
}

// Update Case Details
const updateCase = async (req, res) => {
    try {
        const c_id = req.params.id;
        if (!c_id) {
            return res.status(400).send("Invalid id parameter");
        }

        const case_data = await caseModel.findById(c_id);

        if (case_data) {
            // console.log("Case data:", case_data);
            const updatedData = req.body;

            Object.assign(case_data, updatedData)

            await case_data.save();
            res.status(200).json({ status: 200, message: "Data updated successfully", response: case_data })
        } else {
            res.status(400).json({ message: "No data found", status: 404 });
        }
    } catch (error) {
        res.status(500).send(`internal Error ${error}`);
    }
}

// Delete Case
const deleteCase = async (req, res) => {
    let c_id = req.params.id;
    try {
        if (!c_id) {
            return res.status(400).json({ message: "Invalid Id parameter", status: 404 });
        }

        const case_data = await caseModel.findById(c_id);
        if (!case_data) {
            return res.status(400).json({ message: "No data found", status: 400 });
        }

        await caseModel.findByIdAndDelete(c_id);
        res.status(200).json({ status: 200, message: "Data Deleted", response: case_data })
    } catch (error) {
        res.status(400).json({ status: 400, message: "Internal Error" })
    }
}

// get single Case Data
const singleCaseData = async (req, res) => {
    let c_id = req.params.id;
    try {
        if (c_id != null) {
            const caseData = await caseModel.findById(c_id);
            if (caseData) {
                res.status(200).json({ status: 200, data: caseData, message: "Data retrived" })
            } else {
                res.status(500).json({ status: 500, message: "no Data found" })
            }

        } else {
            res.status(500).json({ status: 500, message: "Invalid Case id" })
        }
    } catch (e) {
        res.json({ message: "Internal Error", error: e })
    }
}


module.exports = { getAllCases, addNewCase, updateCase, deleteCase, singleCaseData }