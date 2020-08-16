const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const { route } = require('.');

// use passport as a middleware to authenticate
router.get('/profile',passport.checkAuthentication, usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate( 'local',{failureRedirect: '/users/sign-in',
                                                                  failureFlash:true
                                                               }), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

//------------------Google Oauth------------------------//
//send to google
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));    
//google send to me
router.get('/auth/google/callback1', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);

router.get('/forgot_password',usersController.forgot_password);
router.post('/forgot_password',usersController.send_email);

router.get('/update/:token',usersController.find_token);
router.post('/update/:token',usersController.update_password);

module.exports = router;

