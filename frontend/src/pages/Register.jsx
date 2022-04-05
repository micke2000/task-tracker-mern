import React from 'react'
import { useState, useEffect } from 'react'

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { name, email, password } = formData
    const onChange = (e)=>{
        setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
        }))
    }
    const onSubmit = (e)=>{
        e.preventDefault()
    }
    return (
        <>
            <div className="center_box">
                <div className="top gradient">
                    <p>Task Tracker</p>
                </div>
                <form onSubmit={onSubmit}>
                    <h2>Please create an account</h2>
                    <label for="name">Name:<input type="text" name="name" placeholder="How we should call you" value={name} onChange={onChange}/>
                    </label>
                    <label for="email">E-mail:<input type="text" name="email" placeholder="Your future login" value={email} onChange={onChange}/>
                    </label>
                    <label for="password">Password:<input type="text" name="password" placeholder="Password to your account" value={password} onChange={onChange}/>
                    </label>
                    <button type="submit" className="btn">Sign up</button>
                </form>
            </div>
        </>
    )
}

export default Register
