import express from 'express';
import { loginUser, registerUser, verifyRazorpay } from '../controllers/userController.js';
import { userAuth } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/verify-razorpay', verifyRazorpay);
userRouter.post('/credits', userAuth, (req, res) => {
    try {
        const userId = req.user.id;
        res.json({ success: true, message: 'Credits retrieved', credits: req.user.creditBalance || 0 });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

export default userRouter;