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


// Controllers for Summary
const addOrUpdateSummary = async (req, res) => {
    try {
        const { uniqueId, summary } = req.body;
        if (!uniqueId) {
            return res.status(400).json({ message: "uniqueId is required" });
        }
        const updatedResume = await Resume.findOneAndUpdate(
            { uniqueId },
            { summary },
            { new: true, upsert: true }
        );
        res.status(200).json({ message: "Summary updated successfully", resume: updatedResume });
    } catch (error) {
        res.status(500).json({ message: "Error updating summary", error });
    }
};

const deleteSummary = async (req, res) => {
    try {
        const { uniqueId } = req.params;
        const resume = await Resume.findOne({ uniqueId });

        if (!resume) return res.status(404).json({ message: "Resume not found" });

        resume.summary = "";
        await resume.save();

        res.json({ message: "Summary deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Education Part
const addEducation = async (req, res) => {
    try {
        const { uniqueId, education } = req.body;

        let edu = await Resume.findOne({ uniqueId });
        if (!edu) {
            edu = new Resume({ uniqueId, education: [] });
        }
        edu.education.push(education);
        await edu.save();
        res.status(201).json({ message: "Education added successfully", education: edu.education });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error adding education", error });
    }
};
const editEducation = async (req, res) => {
    try {
        const { uniqueId, educationId } = req.params;
        const updatedEducation = req.body;
        const resume = await Resume.findOne({ uniqueId });
        if (!resume) return res.status(404).json({ message: "Resume not found" });
        const index = resume.education.findIndex(edu => edu._id.toString() === educationId);
        if (index === -1) return res.status(404).json({ message: "Education entry not found" });
        resume.education[index] = { ...resume.education[index].toObject(), ...updatedEducation };
        await resume.save();
        res.json({ message: "Education updated successfully", education: resume.education });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEducation = async (req, res) => {
    try {
        const { uniqueId, id } = req.params;
        const resume = await Resume.findOne({ uniqueId });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        const index = resume.education.findIndex(
            (edu) => edu._id.toString() === id
        );

        if (index === -1) {
            return res.status(404).json({ message: "Education entry not found" });
        }
        resume.education.splice(index, 1);
        await resume.save();
        res.json({ message: "Education entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting education:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// work experience
const addWorkExperience = async (req, res) => {
    try {
        const { uniqueId, workExperience } = req.body;
        let experience = await Resume.findOne({ uniqueId });
        if (!experience) {
            experience = new Resume({ uniqueId, workExperience: [] });
        }
        experience.workExperience.push(workExperience);
        await experience.save();
        res.status(201).json({ message: "workExperience added successfully", workExperience: experience.workExperience });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editWorkExperience = async (req, res) => {
    try {
        const { uniqueId, workExperienceId } = req.params;
        const updatedWorkExperience = req.body;
        const experience = await Resume.findOne({ uniqueId });
        if (!experience) return res.status(404).json({ message: "experience not found" });
        const index = experience.workExperience.findIndex(edu => edu._id.toString() === workExperienceId);
        if (index === -1) return res.status(404).json({ message: "Experience entry not found" });
        experience.workExperience[index] = { ...experience.workExperience[index].toObject(), ...updatedWorkExperience };
        await experience.save();
        res.json({ message: "Experience updated successfully", workExperience: experience.workExperience });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteWorkExperience = async (req, res) => {
    try {
        const { uniqueId, index } = req.params;
        const experience = await Resume.findOne({ uniqueId });
        if (!experience) {
            return res.status(404).json({ message: "experience not found" });
        }
        const workExperienceList = experience.workExperience;
        if (index < 0 || index >= workExperienceList.length) {
            return res.status(400).json({ message: "Invalid education index" });
        }
        workExperienceList.splice(index, 1);
        await experience.save();
        res.json({ message: "Education entry deleted successfully", workExperience: experience.workExperience });
    } catch (error) {
        console.error("Error deleting education:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Projects Section
const addProject = async (req, res) => {
    try {
        const { uniqueId, project } = req.body;
        let userProjects = await Resume.findOne({ uniqueId });
        if (!userProjects) {
            userProjects = new Resume({ uniqueId, projects: [] });
        }
        userProjects.projects.push(project);
        await userProjects.save();
        res.status(201).json({ message: "Project added successfully", projects: userProjects.projects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editProject = async (req, res) => {
    try {
        const { uniqueId, projectId, updatedProject } = req.body;
        const userProjects = await Resume.findOne({ uniqueId });
        if (!userProjects) {
            return res.status(404).json({ message: "User not found" });
        }
        const projectIndex = userProjects.projects.findIndex(p => p._id.toString() === projectId);
        if (projectIndex === -1) {
            return res.status(404).json({ message: "Project not found" });
        }
        userProjects.projects[projectIndex] = { ...userProjects.projects[projectIndex], ...updatedProject };
        await userProjects.save();
        res.status(200).json({ message: "Project updated successfully", projects: userProjects.projects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { uniqueId, projectId } = req.body;
        let userProjects = await Resume.findOne({ uniqueId });
        if (!userProjects) {
            return res.status(404).json({ message: "User not found" });
        }
        userProjects.projects = userProjects.projects.filter(p => p._id.toString() !== projectId);
        await userProjects.save();
        res.status(200).json({ message: "Project deleted successfully", projects: userProjects.projects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Skills Section
const addSkills = async (req, res) => {
    try {
        const { uniqueId, skills } = req.body;
        let userSkills = await Resume.findOne({ uniqueId });
        if (!userSkills) {
            userSkills = new Resume({ uniqueId, skills: [] });
        }
        userSkills.skills = [...new Set([...userSkills.skills, ...skills])]; // Avoid duplicate entries
        await userSkills.save();
        res.status(201).json({ message: "Skills added successfully", skills: userSkills.skills });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSkill = async (req, res) => {
    try {
        const { uniqueId, skill } = req.body;
        let userSkills = await Resume.findOne({ uniqueId });
        if (!userSkills) {
            return res.status(404).json({ message: "User not found" });
        }
        userSkills.skills = userSkills.skills.filter(s => s !== skill);
        await userSkills.save();
        res.status(200).json({ message: "Skill deleted successfully", skills: userSkills.skills });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Certificates
const addCertificate = async (req, res) => {
    try {
        const { uniqueId, title, provider, date } = req.body;
        let resume = await Resume.findOne({ uniqueId });

        if (!resume) {
            resume = new Resume({ uniqueId, certificates: [] });
        }

        const newCertificate = { title, provider, date };
        resume.certificates.push(newCertificate);
        await resume.save();

        res.status(201).json({ message: "Certificate added successfully", certificates: resume.certificates });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editCertificate = async (req, res) => {
    try {
        const { uniqueId, certificateId, title, provider, date } = req.body;
        const resume = await Resume.findOne({ uniqueId });

        if (!resume) return res.status(404).json({ message: "Resume not found" });

        const certificate = resume.certificates.id(certificateId);
        if (!certificate) return res.status(404).json({ message: "Certificate not found" });

        certificate.title = title;
        certificate.provider = provider;
        certificate.date = date;
        await resume.save();

        res.status(200).json({ message: "Certificate updated successfully", certificates: resume.certificates });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCertificate = async (req, res) => {
    try {
        const { uniqueId, certificateId } = req.body;
        const resume = await Resume.findOne({ uniqueId });

        if (!resume) return res.status(404).json({ message: "Resume not found" });

        resume.certificates = resume.certificates.filter(cert => cert._id.toString() !== certificateId);
        await resume.save();

        res.status(200).json({ message: "Certificate deleted successfully", certificates: resume.certificates });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Links Section
const addLinks = async (req, res) => {
    const { uniqueId, website, url } = req.body;

    try {
        let userLinks = await Resume.findOne({ uniqueId });

        if (!userLinks) {
            userLinks = new Resume({ uniqueId, links: [] });
        }

        userLinks.links.push({ website, url });
        await userLinks.save();

        res.status(201).json({ message: "Link added successfully", links: userLinks.links });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error adding link", error });
    }
};

const deleteLink = async (req, res) => {
    const { uniqueId, linkId } = req.params;

    try {
        const userLinks = await Resume.findOne({ uniqueId });

        if (!userLinks) {
            return res.status(404).json({ message: "Links not found" });
        }

        userLinks.links = userLinks.links.filter((link) => link._id.toString() !== linkId);
        await userLinks.save();

        res.status(200).json({ message: "Link deleted successfully", links: userLinks.links });
    } catch (error) {
        res.status(500).json({ message: "Error deleting link", error });
    }
};


module.exports = {
    getAllData,
    //Basic Info
    addOrUpdateBasicInfo,
    //Summary
    addOrUpdateSummary,
    deleteSummary,
    //Education
    addEducation,
    editEducation,
    deleteEducation,
    //Work Experience
    addWorkExperience,
    editWorkExperience,
    deleteWorkExperience,
    // Projects
    addProject,
    editProject,
    deleteProject,
    // Skills
    addSkills,
    deleteSkill,
    // Certificates
    addCertificate,
    editCertificate,
    deleteCertificate,
    // Links
    addLinks,
    deleteLink
}