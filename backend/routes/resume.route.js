const { getAllData } = require('../controllers/resumeController');

const router = require('express').Router();

router.get('/:uniqueId', getAllData);

module.exports = router;