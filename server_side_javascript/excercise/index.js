const router = require('express').Router();

const controller = require('./controller');
router.get('/list', controller.list);
router.get('/view', controller.view);

module.exports = router;
