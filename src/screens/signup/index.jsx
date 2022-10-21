import React, { useState , useEffect } from 'react'
import { auth , db } from '../../firebase'
import "./signup.css"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
 const[firstName,setFirstname] = useState("")   
 const[lastName,setLastname] = useState("")   
 const[contact,setContact] = useState("")   
 const[email,setEmail] = useState("")   
 const[password,setPassword] = useState("")   

 const user = localStorage.getItem("uid");

 const navigate = useNavigate();
 useEffect(()=>{
    if(user){
        navigate("/todo")
    }
} , [])

 const signupHandler = (e)=>{
    e.preventDefault();
     console.log("submit form ho raha hai kia")
    const dbCollection = collection(db, "userData");

     createUserWithEmailAndPassword(auth ,email ,password)
     .then( async (resolve)=>{
      console.log(resolve , "resolve")
      const obj = {
        firstname : firstName,
        lastname : lastName,
        conatct : contact,
        email : email
      }
       await addDoc(dbCollection, obj)

       navigate("/");

     })
     .catch(err=>{
        console.log(err , "error")
        alert("Please fill correct data and password should be atleast 6 characters")
     })
 }
    return (
        <div>
            <h1 className='signupheading'>SignUp Form</h1>
            <form onSubmit={signupHandler}>
                <div className='signup-inputs'>

                    <label htmlFor="">FirstName :</label>
                    <input type="text" required onChange={(e)=>setFirstname(e.target.value)} placeholder='Enter Your FirstName' />
                </div>
                <div className='signup-inputs'>

                    <label htmlFor="">LastName :</label>
                    <input type="text" required onChange={(e)=>setLastname(e.target.value)} placeholder='Enter Your LastName' />
                </div>
                <div className='signup-inputs'>

                    <label htmlFor="">Contact :</label>
                    <input type="number" onChange={(e)=>setContact(e.target.value)} placeholder='Enter Your Contact Number' />
                </div>
                <div className='signup-inputs'>

                    <label htmlFor="">Email :</label>
                    <input type="email" required onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email' />
                </div>
                <div className='signup-inputs'>

                    <label htmlFor="">Password :</label>
                    <input type="password" required onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password' />
                </div>
                <div className='signup-button'>
                <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
