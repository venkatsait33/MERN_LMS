import express from 'express';
import { login, register } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/register').post(register); // register user
router.route('/login').post(login); // login user

export default router;