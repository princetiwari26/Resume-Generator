const { getAllData, addOrUpdateBasicInfo } = require('../controllers/resumeController');

const router = require('express').Router();

router.get('/:uniqueId', getAllData);

// Basic Info
router.post('/basic-info/add-or-update', addOrUpdateBasicInfo);

module.exports = router;