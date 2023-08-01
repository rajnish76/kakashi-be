const express = require('express');
// const validate = require('../../middlewares/validate');
// const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.post('/add', productController.addProduct);

module.exports = router;
