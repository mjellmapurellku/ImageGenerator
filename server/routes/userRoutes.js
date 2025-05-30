userRoutes.js

import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { userCredits } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
 userRouter.post('/credits', userAuth , userCredits);

export default userRouter;


// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login