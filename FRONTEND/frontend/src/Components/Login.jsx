import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {

    const[userData,setUserData]=useState({email:"", password:""})
    const router= useNavigate();

    const handleChange =(event)=>{
        setUserData({...userData,[event.target.name]:event.target.value})
    }

   

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.email && userData.password) {
            const response = await axios.post("http://localhost:8008/login", { userData });
            if (response.data.success) {
                setUserData({ email: "", password: "" })
                router('/')
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } else {
            toast.error("All fields are mandtory.")
        }
    }

  return (
    <div style={{width:"40%", margin:"auto", marginTop:"50px"}}>
        <form style={{width:"60%", margin:"auto", textAlign:"center"}} onSubmit={handleSubmit}>
            <label>Enter Email :</label><br/>
            <input type='email' name='email' value={userData.email} onChange={handleChange}/><br/>
            <label>Enter Password :</label><br/>
            <input type='password' name='password' value={userData.password} onChange={handleChange}/><br/>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login