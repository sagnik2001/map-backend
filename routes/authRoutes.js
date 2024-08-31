const express = require('express');
const AuthController = require('../controllers/AuthController');


const router = express.Router();

router.post('/authenticate', AuthController.authenticateUser);

module.exports = router;
