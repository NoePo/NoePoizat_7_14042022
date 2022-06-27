const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth.controller');

router.post('/register', authCtrl.signUp);
router.post('/login', authCtrl.signIn);
router.get('/logout',  authCtrl.logout);

module.exports = router;