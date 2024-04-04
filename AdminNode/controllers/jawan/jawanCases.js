const caseModel = require('../../models/CaseModel')

const jawanAssignedCases = async (req, res) => {
    try {
        const jawan_id = req.params.id
        const all_cases = await caseModel.find()
        const status = { completed: 0, incomplete: 0 }
        let assigned_cases = []
        all_cases.forEach((item) => {
            if (item.assignedJawan === jawan_id) {
                // console.log(jawan_id)
                assigned_cases.push(item)
            }
        });
        if (assigned_cases.length > 0) {
            assigned_cases.forEach((item) => {
                if (item.completed === '1') {
                    status.completed += 1
                } else {
                    status.incomplete += 1
                }
            })
        }
        res.status(200).json({ message: "Data retrived", data: assigned_cases, status: status })

    } catch (err) {
        res.status(500).json({ message: 'Internal Error', error: err })
    }
};


const jawanSingleCaseDetail = async (req, res) => {
    try {
        const case_id = req.params.id
        const case_detail = await caseModel.findById(case_id)

        if (case_detail) {
            res.status(200).json({ message: 'Case Data', data: case_detail })
        } else {
            res.status(404).json({ message: 'Case Id not found', data: case_detail })
        }

    } catch (err) {
        res.status(500).json({ message: 'Internal Error', error: err })
    }
}


module.exports = {jawanAssignedCases, jawanSingleCaseDetail}