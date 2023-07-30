const express = require('express');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/register', userController.register);

module.exports = router;
