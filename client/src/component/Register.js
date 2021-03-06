import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom"
import {toast} from "react-toastify";
export default function Register({setAuth}) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });
  const {email, password, name} = inputs;
  const onChange = (e)=>{
      setInputs({...inputs, [e.target.name]: e.target.value})
  }
const onSubmitForm = async(e)=>{
    e.preventDefault();
    const body = {email, password, name}
    try {
        const res = await fetch("http://localhost:5000/auth/register",{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        })
        const parseRes = await res.json()
     //set up to the local storage
     if(parseRes.token){
       localStorage.setItem("token", parseRes.token)
       setAuth(true)
toast.success("Registered successfully");
     }else{
      setAuth(false)
      toast.error(parseRes)
     }
    } catch (error) {
        console.log(error.message);
    }
}


  return (
    <Fragment>
      <h1 className="text-center my-5">Resgister</h1>

      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e)=>onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e)=>onChange(e)}
        />
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={(e)=>onChange(e)}
        />
        <button className="btn btn-success btn-block my-3">Submit</button>
        <Link to="/login">Login</Link>

      </form>
    </Fragment>
  );
}
