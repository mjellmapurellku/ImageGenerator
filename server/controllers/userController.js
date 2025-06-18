import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import razorpay from 'razorpay';
import transactionModel from '../models/transactionModel.js';

// REGISTER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.json({ success: true, token, user: { name: user.name } });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: 'Missing email or password' });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.json({ success: true, token, user: { name: user.name } });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// RAZORPAY INSTANCE
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRETS,
});

// PAYMENT FUNCTION
const payementRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body;

        if (!userId || !planId) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        let credits, plan, amount;

        switch (planId) {
            case 'Basic':
                plan = 'Basic';
                credits = 100;
                amount = 10;
                break;
            case 'Advanced':
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;
            case 'Business':
                plan = 'Business';
                credits = 5000;
                amount = 250;
                break;
            default:
                return res.json({ success: false, message: 'Plan not found' });
        }

        const transactionData = {
            userId,
            plan,
            amount,
            credits,
            date: Date.now()
        };

        const newTransaction = await transactionModel.create(transactionData);

        const options = {
            amount: amount * 100, // Razorpay expects the amount in paisa
            currency: process.env.CURRENCY,
            receipt: newTransaction._id.toString(),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error.message });
            }
            res.json({ success: true, order });
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ You can add this later if needed
// const userCredits = async (req, res) => { ... }

export { loginUser, registerUser, payementRazorpay };
