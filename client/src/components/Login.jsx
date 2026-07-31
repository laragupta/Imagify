import React, { useContext, useState ,useEffect} from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import axios from 'axios'
import { toast } from 'react-toastify';

function Login() {
    const[state,setState]=useState('Login')
    const {setShowLogin,backenedUrl,setToken,setUser}=useContext(AppContext)
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    // it is async function beacuse here we call the APIs
    // while submitting we need to create the account if the uer is new 
    
    const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
        if (state === 'Login') {
            const { data } = await axios.post(
                backenedUrl + '/api/user/login',
                { email, password }
            );
            //We use a POST request for login because the client needs to send sensitive 
            // information such as the email and password to the backend. These credentials are sent securely
            //  in the request body rather than the URL. The backend then verifies the user and returns a JWT token 
            // if authentication is successful. GET is
            //  intended for retrieving data and is not appropriate for sending sensitive information like passwords.

            if (data.success) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token', data.token);
                setShowLogin(false);
            } else {
                toast.error(data.message);
            }

        } else {
            const { data } = await axios.post(
                backenedUrl + '/api/user/register',
                { name, email, password }
            );

            console.log(data);

            if (data.success) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token', data.token);
                setShowLogin(false);
            } else {
                toast.error(data.message);
            }
        }

    } catch (error) {
        toast.error(error.message);
    }
}
    
    useEffect(()=>{
        document.body.style.overflow='hidden';
        return()=>{
            document.body.style.overflow='unset';
        }

    },[])
    //This useEffect runs once when the Login component mounts. It sets document.body.style.overflow = 'hidden'
    //  to disable background scrolling while the login popup is open.
    //  The cleanup function runs when the component unmounts, restoring overflow to 'unset' 
    // so the page becomes scrollable again. 
    // The cleanup is important because without it, the website would remain non-scrollable even after closing the popup.

  return (
    <div 
    className='fixed top-0 left-0 right-0 bottom-0 z-10 
    backdrop-blur-sm bg-black/30 flex 
    justify-center items-center'>
        <motion.form  onSubmit={onSubmitHandler}
    initial={{opacity:0.2,y:50}}
    transition={{duration:0.3}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
        className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>
            {state!=='Login' && <div className='border px-6 py-2  flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.user_icon} alt=''></img>
                <input onChange={e=>setName(e.target.value)} value={name}type='text' className='outline-none text-sm' placeholder='Full Name' required></input>
            </div>}
            <div className='border px-6 py-2  flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt=''></img>
                <input onChange={e=>setEmail(e.target.value)} value={email} type='email' className='outline-none text-sm' placeholder='Email-Id' required></input>
            </div>
            <div className='border px-6 py-2  flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt=''></img>
                <input onChange={e=>setPassword(e.target.value)} value={password}type='password' className='outline-none text-sm' placeholder='Password' required></input>
            </div>
            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password ?</p>
            <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state=='Login'?'login':'create account'}
                </button>
                {state ==='Login'?
            <p className='mt-5 text-center'>Don't have a account ?
                <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')}>
                    Sign Up</span></p>:
             <p className='mt-5 text-center'>Already have an account?
                <span onClick={()=>setState('Login')}className='text-blue-600 cursor-pointer'>
                    Login</span></p>}

                    <img  onClick={()=>setShowLogin(false)}className='absolute top-5 right-5 cursor-pointer 'src={assets.cross_icon}>
                    </img>

        </motion.form>
      
    </div>
  );
}

export default Login;
