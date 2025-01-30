import express from 'express';
import { getUserProfile, login, logout, register, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../utils/multier.js';

const router = express.Router();

router.route('/register').post(register); // register user
router.route('/login').post(login); // login user
router.route('/logout').get(logout); // logout user
router.route('/profile').get(isAuthenticated, getUserProfile); // get user profile
router.route('/profile/update').put(isAuthenticated, upload.single("profilePhoto"), updateProfile); // update user profile

export default router;