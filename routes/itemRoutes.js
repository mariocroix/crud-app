const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllItems);
router.get('/new', itemController.showNewItemForm);
router.post('/new', itemController.createItem);
router.get('/edit/:id', itemController.showEditItemForm);
router.post('/edit/:id', itemController.updateItem);
router.post('/delete/:id', itemController.deleteItem);

module.exports = router;
