const express = require('express');
const viewController = require('./../controllers/viewController')
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');


const router = express.Router();


router.get('/', bookingController.createBookingCheckout, authController.isLoggedIn, viewController.getOverview)
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', viewController.getSignupForm);
router.get('/forgotPassword', viewController.getForgotPasswordForm);
router.get('/resetPassword/:token', authController.checkUserToken, viewController.getResetPasswordForm);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);

// router.post('/submit-user-data', authController.protect, viewController.updateUserData);
// router.put('/updateMe', authController.protect, viewController.getAccount);

module.exports = router;