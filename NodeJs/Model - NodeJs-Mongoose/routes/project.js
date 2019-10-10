const router = require('express').Router();
const projectController = require('../controllers/projectController.js');


// CRUD Routes

router.get('/', projectController.index);
router.get('/show/:id', projectController.show);
router.get('/add', projectController.add);
router.post('/save', projectController.save);
router.get('/edit/:id', projectController.edit);
router.post('/update/:id', projectController.update);
router.get('/delete/:id', projectController.delete);
router.get('/disable/:id', projectController.disable);

module.exports = router;