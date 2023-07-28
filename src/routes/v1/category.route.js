const express = require('express');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router.post('/addCategory', categoryController.addCategory);
router.get('/getCategory', categoryController.getCategory);
router.get('/getCategoryById', categoryController.getCategoryById);
router.post('/updateCategory', categoryController.updateCategory);
router.delete('/deleteCategory', categoryController.deleteCategory);

module.exports = router;
