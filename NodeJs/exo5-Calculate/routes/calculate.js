const router = require('express').Router();

const calculateController = require('../controllers/calculateController.js');

router.get('/', calculateController.list);
// router.post('/resultat', calculateController.result);
// router.get('/add', calculateController.add);
router.post('/save', calculateController.save);
router.get('/calcul/:id', calculateController.result);
router.get('/update/:id', calculateController.edit);
router.post('/update/:id', calculateController.update);
router.get('/disable/:id', calculateController.disable);
// router.get('/delete/:id', calculateController.delete);

module.exports = router;