import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import "./login.css"
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const LoginUp = () => {

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const user = localStorage.getItem("uid");
    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
            navigate("/todo")
        }
    } , [])

const loginHandler = (e)=>{
  e.preventDefault();
  signInWithEmailAndPassword(auth , email , password)
  .then( async (resolve)=>{
    console.log(resolve , "resolve")
    localStorage.setItem("uid" , resolve.user.uid)
    
    navigate("/todo");

   })
   .catch(err=>{
      console.log(err , "error")
      alert("Your data is not match")
   })
}
const signupHandler = ()=>{
    navigate("/signup")
}

  return (
    
      <div className='login-body'>
            <h1 className='signupheading'>Login Form</h1>
            <form onSubmit={loginHandler}>
              
              
                <div className='signup-inputs'>

                    <label htmlFor="">Email :</label>
                    <input type="email" required onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter Your Email' />
                </div>
                <div className='signup-inputs'>

                    <label htmlFor="">Password :</label>
                    <input type="password" required onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter Your Password' />
                </div>
                <div className='signup-button'>
                <button>Login</button>
                </div>
            </form>
            <div className='signup-button'>
                <button onClick={signupHandler}>Signup</button>

            </div>
            
        </div>
    
  )
}

export default LoginUp
