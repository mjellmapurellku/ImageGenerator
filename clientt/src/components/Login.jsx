import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Login = () => {
    const [state, setState] = useState('Login');
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            if (state === 'Login') {
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                    setMessage('Login successful!');
                } else {
                    setMessage(data.message || 'Login failed. Please check your credentials.');
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                    setMessage('Registration successful!');
                } else {
                    setMessage(data.message || 'Registration failed. Please try again.');
                }
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
            console.error('Error during submission:', error);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <motion.form
                onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='relative bg-white p-10 rounded-xl text-slate-500 max-w-md w-full'
            >
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
                <p className='text-center text-sm mt-2'>
                    {state === 'Login' ? 'Welcome back! Please sign in to continue' : 'Create an account to get started'}
                </p>
                {message && (
                    <p className={`text-sm mt-4 text-center ${message.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}

                {state === 'Sign Up' && (
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                        <img src={assets.user_icon} alt="User icon" />
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            className='outline-none text-sm w-full'
                            placeholder='Full Name'
                            required
                        />
                    </div>
                )}

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.email_icon} alt="Email icon" />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className='outline-none text-sm w-full'
                        placeholder='Email id'
                        required
                    />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="Lock icon" />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className='outline-none text-sm w-full'
                        placeholder='Password'
                        required
                    />
                </div>

                {state === 'Login' && (
                    <p className='text-sm text-blue-600 my-4 cursor-pointer hover:underline'>Forgot password?</p>
                )}

                <button
                    type="submit"
                    className='bg-blue-600 w-full text-white py-2 rounded-full mt-4 hover:bg-blue-700 transition'
                >
                    {state === 'Login' ? 'Login' : 'Create Account'}
                </button>

                <p className='mt-5 text-center text-sm'>
                    {state === 'Login' ? "Don't have an account?" : 'Already have an account?'}
                    <span
                        className='text-blue-600 cursor-pointer hover:underline'
                        onClick={() => {
                            setState(state === 'Login' ? 'Sign Up' : 'Login');
                            setMessage(''); // Clear message on state change
                        }}
                    >
                        {state === 'Login' ? ' Sign up' : ' Login'}
                    </span>
                </p>

                <img
                    onClick={() => setShowLogin(false)}
                    src={assets.cross_icon}
                    alt="Close icon"
                    className='absolute top-5 right-5 cursor-pointer w-5 h-5'
                />
            </motion.form>
        </div>
    );
};

export default Login;