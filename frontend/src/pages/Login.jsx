import React from 'react'
import { useState, useEffect } from 'react'

function Login() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { email, password } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <div className="center_box">
                <div className="top gradient">
                    <p>Task Tracker</p>
                </div>
                <form onSubmit={onSubmit}>
                    <h2>Log in to your account</h2>
                    <label for="name">E-mail:<input type="text" name="email" placeholder="Enter your email" onChange={onChange}/></label>
                    <label for="password">Password:<input type="text" name="password" placeholder="Password" onChange={onChange}/></label>
                    <button type="submit" className="btn">Log in</button>
                </form>
            </div>
        </>
    )
}

export default Login
