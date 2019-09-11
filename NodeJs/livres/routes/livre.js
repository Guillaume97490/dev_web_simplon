const router = require('express').Router();

const livreController = require('../controllers/livreController.js');

router.get('/', livreController.list);
router.get('/add', livreController.add);
router.post('/add', livreController.save);
router.get('/update/:id', livreController.edit);
router.post('/update/:id', livreController.update);
router.get('/delete/:id', livreController.delete);

module.exports = router;
