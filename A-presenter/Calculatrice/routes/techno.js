const router = require('express').Router();
const technoController = require('../controllers/technoController.js');

router.get('/', technoController.index);


module.exports = router;