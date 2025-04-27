import express from 'express';
import { register, login, logout, withdraw } from '../controllers/authController';
import { verifyToken } from '../midlewares/login-required';

const router = express.Router();

router.post('/signup', register);
router.post('/users/login', login);
router.post('/users/logout', logout);
router.post('/users/withdraw', verifyToken, withdraw);

export default router;
