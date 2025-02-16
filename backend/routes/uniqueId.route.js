const router = require('express').Router();
const generateId = require('../controllers/uniqueIdController');

router.get('/generate-unique-id', generateId)

module.exports = router;