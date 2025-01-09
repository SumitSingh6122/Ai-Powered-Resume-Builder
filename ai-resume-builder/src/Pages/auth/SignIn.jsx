import  { useState } from 'react';
import { CiUser, CiLock } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaArrowAltCircleRight, FaGithub } from "react-icons/fa";

import { Button } from '@mui/material';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './form.css';
import { useDispatch } from 'react-redux';
import {  setUser } from '@/redux/AuthSlice';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleSignInToggle = () => setIsSignIn(!isSignIn);

  
  const handleOAuthLogin = async (providerType) => {
    setLoading(true);
    try {
      const provider = providerType === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const formData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
 console.log(formData);
      
      await handleOAuthSubmit(providerType, formData);
    } catch (error) {
      toast.error(`${providerType.charAt(0).toUpperCase() + providerType.slice(1)} Sign In Failed`);
    } finally {
      setLoading(false);
    }
  };

  
  const handleOAuthSubmit = async (providerType, formData) => {
    try {
      const endpoint = providerType === 'google' ? 'google-login' : 'github-login';
      console.log(providerType);
      const res=await axios.post(`http://localhost:3000/api/v1/${endpoint}`, formData);
      const { user, token } = res.data;
      dispatch(setUser({user,token, isAuthenticated: true }));
      toast.success('Login Successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Something went wrong with OAuth login.');
    }
  };

  
  const onSubmitHandler = async () => {
    setLoading(true);
    try {
      const formData = isSignIn
        ? { email, password } 
        : { username, email, password }; 
  
      const endpoint = isSignIn ? '/login' : '/register';
      const res = await axios.post(`https://ai-powered-resume-builder-tnzl.vercel.app/api/v1${endpoint}`, formData);
  
      if (isSignIn) {
        const { user, token } = res.data;
        dispatch(setUser({ user, token, isAuthenticated: true }));
        toast.success('Login Successful!');
        navigate('/dashboard');
      } else {
        toast.success('Registration Successful!');
        setIsSignIn(true);
      }
    } catch (error) {
      console.error('Error during authentication:', error.response?.data.message);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="body bg-gradient-to-tr from-[#1f242d] to-[#10244b]">
      <form className="form">
        <div className="container">
          <h1 className="h1">{isSignIn ? "Sign in" : "Sign Up"} to <span>AI-Resume Builder</span></h1>
          <p className="text-center">{isSignIn ? "Welcome back! Please sign in to continue" : "Create a new account"}</p>

          <div className="input-form">
            {!isSignIn && (
              <div className="input-box">
                <CiUser className="icon" />
                <input type="text" placeholder="Enter your full name" onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            <div className="input-box">
              <MdOutlineEmail className="icon" />
              <input type="text" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-box">
              <CiLock className="icon" />
              <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button
              variant="contained"
              className="submit-btn"
              onClick={onSubmitHandler}
              disableElevation
            >
              {loading ? <Loader className="animate-spin text-xl" /> : <>Continue <FaArrowAltCircleRight className="ml-3" /></>}
            </Button>
            <p className="mt-2">
              {isSignIn
                ? "Don't have an account? "
                : "Already have an account? "}
              <span onClick={handleSignInToggle}>{isSignIn ? "Sign Up" : "Sign In"}</span>
            </p>
          </div>

          <p className="or text-center">Or</p>
          <div className="social-auth">
            <div className="media">
              <Button className="media-btn" onClick={() => handleOAuthLogin('google')}>
                <FcGoogle className="text-2xl" /> Sign in with Google
              </Button>
              <Button className="media-btn" onClick={() => handleOAuthLogin('github')}>
                <FaGithub className="text-2xl" /> Sign in with GitHub
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
