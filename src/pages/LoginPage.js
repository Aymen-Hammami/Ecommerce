import React, { useState } from 'react'
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth'
import { async } from '@firebase/util'
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import { Navigate, useNavigate } from 'react-router-dom'
function LoginPage() {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')  
  const[loading,setLoading]=useState(false)
  const auth = getAuth()
  const navigate = useNavigate()
  const signIn=async ()=>{
    try {
      const user = await signInWithEmailAndPassword(auth,email,password)
      localStorage.setItem('currentUser',JSON.stringify(user))
      toast.success("authentication mchat")
      window.location.href='/'
    } catch (error) {
      console.log(error)
      toast.error("authentication mamchetech")
    }
  }
  return (
    <div className='login-parent'>
      {loading && (<Loader/>)}
      <div className='login-top'>
        
      </div>

      <div className='row justify-content-center'>
        <div className='col-md-5'>
          <img src='https://www.ideematic.com/wp-content/uploads/2018/04/illustration-ecommerce-1024x989.png' alt='nothing' width="600" height="600"/>
        </div>
        <div className='col-md-4 z1'>
          <div className='login-form'>

               <h2>Login</h2>
               <hr/>
               <input type="email" className='form-control' placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
               
               <input type="text" className='form-control' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
               <hr/>
               <button onClick={signIn}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage