const caseCateModel = require('../models/CaseCategory.js')

const getAllCaseCategory = async (req, res) => {
    try {
        const data = await caseCateModel.find({});
        if (data != null) {
            res.status(200).json({ message: "Case Category Data", data: data });
        } else {
            res.status(404).json({ message: "NoData found", data: data });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Error", error: error });
    }
};

// Add new Case Category
const addCaseCategory = async (req, res) => {
    const user_data = caseCateModel(req.body)
    try {
        const response = await user_data.save()
        res.status(200).json({ status: 200, message: "Data added successfully", response: response })
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
}

// Update Case Category Details
const updateCaseCategory = async (req, res) => {
    try {
        const c_id = req.params.id;
        if (!c_id) {
            return res.status(400).send("Invalid id parameter");
        }

        const case_cate_data = await caseCateModel.findById(c_id);

        if (case_cate_data) {
            const updatedData = req.body;

            Object.assign(case_cate_data, updatedData)

            await case_cate_data.save();
            res.status(200).json({ status: 200, message: "Data updated successfully", response: case_cate_data })
        } else {
            res.status(400).json({ message: "No data found", status: 404 });
        }
    } catch (error) {
        res.status(500).send(`internal Error ${error}`);
    }
}

// Delete Case Category
const deleteCaseCategory = async (req, res) => {
    let c_id = req.params.id;
    try {
        if (!c_id) {
            return res.status(400).json({ message: "Invalid Id parameter", status: 404 });
        }

        const case_data = await caseCateModel.findById(c_id);
        if (!case_data) {
            return res.status(400).json({ message: "No data found", status: 400 });
        }

        await caseCateModel.findByIdAndDelete(c_id);
        res.status(200).json({ status: 200, message: "Data Deleted", response: case_data })
    } catch (error) {
        res.status(400).json({ status: 400, message: "Internal Error" })
    }
}

const singleCaseCategory = async (req, res) => {
    let c_id = req.params.id;
    try {
        if (c_id != null) {
            const caseCate = await caseCateModel.findById(c_id);
            if (caseCate) {
                res.status(200).json({ status: 200, data: caseCate, message: "Data retrived" })
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


module.exports = { getAllCaseCategory, addCaseCategory, deleteCaseCategory, updateCaseCategory, singleCaseCategory }