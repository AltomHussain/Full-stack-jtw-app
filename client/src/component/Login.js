import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom"

export default function Login({ setAuth }) {
const [inputs, setInputs] = useState({
    email: "",
    password: ""
})
const {email, password} = inputs;
const handleChange =(e)=>{
    setInputs({...inputs, [e.target.name]: e.target.value})
}

const handleSubmit = async(e)=>{
e.preventDefault();
try {
    const body = {email, password}
    const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(body)
    })
    const parseRes = await res.json();
    localStorage.setItem("token", parseRes.token);
    setAuth(true)
    console.log(parseRes);
} catch (error) {
    console.log(error.message);
}
}
  return (
    <Fragment>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="email"
        name="email"
        className="form-control my-3"
        onChange={(e)=> handleChange(e)}
        value={email}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        className="form-control my-3"
        onChange={handleChange}
        value={password}
      />
      <button className="btn btn-success btn-block">Login</button>
      <Link to="/register">Register</Link>
      </form>
    </Fragment>
  );
}
