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

// Controller for Basic Information
const addOrUpdateBasicInfo = async (req, res) => {
    try {
        const { uniqueId, basicInfo } = req.body;
        if (!uniqueId) {
            return res.status(400).json({ message: "uniqueId is required" });
        }
        const updatedResume = await Resume.findOneAndUpdate(
            { uniqueId },
            {
                $set: { basicInfo },
            },
            { upsert: true, new: true }
        );
        res.status(200).json({ message: "Resume saved successfully", resume: updatedResume });
    } catch (error) {
        res.status(500).json({ message: "Error saving resume", error });
    }
};

module.exports = {
    getAllData,
    //Basic Info
    addOrUpdateBasicInfo
}