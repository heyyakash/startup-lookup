import React, { useEffect, useState } from 'react'
import {RiLoginBoxFill} from 'react-icons/ri'
import Link from 'next/link'
import {login} from '../../functions/loginFunctions';
import Router from 'next/router';


const Login = () => {
    const [signIn,setSignIn] = useState(false);
    const [error,setError] = useState("")
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    
    useEffect(()=>{
      const token = localStorage.getItem("authToken")
      if(token){
        Router.push('/main/profile');
        return;
      }
      
    },[])

    const handleLogin = async(e)=>{
      setSignIn(true);
      e.preventDefault();
      const res = await login({email,password});
      if(res.success){
        setError("");
        const {authToken} = res;
        localStorage.setItem("authToken",authToken);
        setSignIn(false);
        Router.push('/main/profile')
      }
      else{
        const {msg} = res;
        console.log(msg);
        setError(msg);
        setSignIn(false);
      }
    }

  
  return (
    <div className='h-[100vh] relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center'>

      <div className='lg:w-[500px] p-5 py-20 h-[100vh] lg:h-auto w-full bg-white drop-shadow-lg flex justify-center items-center gap-4 flex-col'>
        <RiLoginBoxFill className='text-purple-700 text-2xl' />
        <h2 className='font-bold text-2xl'>Login to your account</h2>
        <p className='text-sm'>Don&rsquo;t have a account yet? <span className='text-purple-700'><Link href = '/login/createnew'>Sign up!</Link></span></p>
      
        <form onSubmit={(e)=>handleLogin(e)} className='flex my-4 flex-col gap-4 w-[300px]'>
          <input required type="email" placeholder='Email Address' id ="email" className={`form-input ${error.length!==0?"border-red-500":""}`} value = {email} onChange = {(e)=>setEmail(e.target.value)} name = "email" />
          <input required type="password" placeholder='Password' id ="password" className={`form-input ${error.length!==0?"border-red-500":""}`} value = {password} onChange = {(e)=>setPassword(e.target.value)} name = "email" />
          {error && <p className='text-red-500 text-sm '>{error} !</p> }
          <button type='submit' className='form-btn'>{signIn?<img className='h-6' src="/loading.gif"  alt="loading" />:"Login"}</button>
        </form>

      </div>
    </div>
  )
}

export default Login