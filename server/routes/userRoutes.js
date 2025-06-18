import express from 'express';
import { loginUser, payementRazorpay, registerUser, userCredits } from '../controllers/userController.js';
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router();

// Define routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', userAuth , userCredits);
userRouter.post('/pay-razor', userAuth , payementRazorpay)

export default userRouter;