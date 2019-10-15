const router = require('express').Router();
const calculController = require('../controllers/calculController.js');

// CRUD Routes

router.get('/', calculController.index);
// router.get('/show/:id', calculController.show);
router.get('/resultat/:id', calculController.calcul);
router.get('/add', calculController.add);
router.post('/save', calculController.save);
router.get('/edit/:id', calculController.edit);
router.post('/update/:id', calculController.update);
router.get('/delete/:id', calculController.delete);
router.get('/disable/:id', calculController.disable);

module.exports = router;