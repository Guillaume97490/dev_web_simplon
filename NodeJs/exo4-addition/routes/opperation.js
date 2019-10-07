const router = require('express').Router();

const opperationController = require('../controllers/opperationController.js');

router.get('/', opperationController.list);
router.post('/resultat', opperationController.result);
// router.get('/add', opperationController.add);
// router.post('/add', opperationController.save);
// router.get('/update/:id', opperationController.edit);
// router.post('/update/:id', opperationController.update);
// router.get('/delete/:id', opperationController.delete);

module.exports = router;