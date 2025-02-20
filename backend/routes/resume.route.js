const { getAllData, addOrUpdateBasicInfo, addOrUpdateSummary, deleteSummary, addEducation, editEducation, deleteEducation, addWorkExperience, editWorkExperience, deleteWorkExperience, addProject, editProject, deleteProject, addSkills, deleteSkill, addCertificate, editCertificate, deleteCertificate, addLinks, deleteLink } = require('../controllers/resumeController');

const router = require('express').Router();

router.get('/:uniqueId', getAllData);

// Basic Info
router.post('/basic-info/add-or-update', addOrUpdateBasicInfo);

// Summary
router.post('/summary/add-or-update-summary', addOrUpdateSummary);
router.delete('/summary', deleteSummary);

//Education
router.post('/add-education/add', addEducation);
router.put('/update-education/:uniqueId/:educationId', editEducation);
router.delete('/delete-education/:uniqueId/:index', deleteEducation);

//Work Experience
router.post('/work-experience/add', addWorkExperience);
router.put('/work-experience/:uniqueId/:workExperienceId', editWorkExperience);
router.delete('/work-experience/:uniqueId/:index', deleteWorkExperience);

//Projects
router.post('/projects/add', addProject);
router.put("/projects/edit", editProject);
router.delete("/projects/delete", deleteProject);

//Skills
router.post("/skills/add", addSkills);
router.delete("/skills/delete", deleteSkill);

// Certificates
router.post("/certificates/add", addCertificate);
router.put("/certificates/edit", editCertificate);
router.delete("/certificates/delete", deleteCertificate);

// Links
router.post("/links/add", addLinks);
router.delete("/links/:uniqueId/:linkId", deleteLink);

module.exports = router;