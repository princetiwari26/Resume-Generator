const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    uniqueId: { type: String, required: true, unique: true },
    basicInfo: {
        name: String,
        email: String,
        phone: String,
        city: String,
    },
    summary: { type: String, default: "" },
    education: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            school: { type: String },
            board: { type: String },
            stream: { type: String },
            degree: { type: String },
            educationLevel: { type: String, enum: ["Secondary (10th)", "Senior Secondary (12th)"] },
            startYear: { type: String },
            endYear: { type: String },
        },
    ],

    workExperience: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Unique user identifier
            type: { type: String, required: true, enum: ["Internship", "Job"] }, // New dropdown field
            profile: { type: String, required: true },
            organization: { type: String, required: true },
            location: { type: String, required: true },
            startYear: { type: String, required: true },
            endYear: { type: String },
        }
    ],
    projects: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            title: String,
            link: String,
            startDate: String,
            endDate: String,
            description: String,
        }
    ],
    skills: [String],
    certificates: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            title: String,
            provider: String,
            date: String,
        }
    ],
    links: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            website: String,
            url: String,
        }
    ]
});

module.exports = mongoose.model("Resume", resumeSchema);