import React, { useState } from 'react'
import { Link  } from 'react-router-dom'
import {createUserWithEmailAndPassword,getAuth} from "firebase/auth"
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
function RegisterPage() {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')  
  const[cpassword,setCpassword]=useState('')  
  const[loading,setLoading]=useState(false)
  const auth =getAuth(  )
  const register = async()=>{
    try {
      setLoading(true)
      const result=await createUserWithEmailAndPassword(auth,email,password)
      setLoading(false)
      toast.success("registration mchat")
    } catch (error) {
      console.log(error)
      setLoading(false)
     toast.error("registration mamchetech")
    } 
  }
  return (
   
    <div className='register-parent'>
      {loading && (<Loader/>)}
      <div className='register-top'>
      
      </div>

      <div className='row justify-content-center'>
        <div className='col-md-5'>
          <img src='https://www.ideematic.com/wp-content/uploads/2018/04/illustration-ecommerce-1024x989.png' alt='nothing' width="600" height="600"/>
        </div>
        <div className='col-md-4 z1'>
          <div className='register-form'>

               <h2>Register</h2>
               <hr/>
               <input type="email" className='form-control' placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
               
               <input type="text" className='form-control' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
              
               <input type="text" className='form-control' placeholder='confirm password ' value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}}/>
               <hr/>
               <button onClick={register}>Register</button>
          </div>
        </div>
      </div>
      
    </div>
    
  )
}

export default RegisterPage