const Resume = require('../models/Resume.model')

const getAllData = async (req, res) => {
    try {
        const { uniqueId } = req.params;
        const resume = await Resume.findOne({ uniqueId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    getAllData
}