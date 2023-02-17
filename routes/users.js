var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const userValidator = require('../middlewares/validators/user.validator');
const loginValidator = require('../middlewares/validators/login.validator');
const { guard } = require('../middlewares/guard');
const sendResetMail = require('../middlewares/services/email.service');
const resetValidator = require('../middlewares/validators/reset.validator');

/* GET users listing. */
router.get('/login', (req, res)=>{
  res.render('login');
})
/**
 * login
 */
router.post('/login', loginValidator, userController.login)


/**
 * Reset Password
 */
router.get('/forgot-password', (req, res)=>{
  res.render('forgot-password');
})

router.post('/forgot-password', userController.resetPassword, sendResetMail);

/**
 * Reset password Form
 */
 router.get('/reset-password/:token', userController.resetPasswordForm);

 router.post('/reset-password/:token', resetValidator, userController.postResetPassword);


/**
 * signup
 */
router.get('/signup', (req, res)=>{
  res.render('signup');
})

router.post('/signup', userValidator, userController.signup)
module.exports = router;

/**
 * dashbord
 */

router.get('/dashboard', guard, (req, res)=>{
  res.render('dashboard');
})

router.post('/save-profile', userController.saveProfile);
/**
 * Logout
 */
router.get('/logout',(req, res)=>{
  req.logout();
  req.flash('success', 'Your are now disconnected !');
  return res.redirect('/');
})