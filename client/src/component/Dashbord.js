import React,{Fragment, useState, useEffect} from 'react'

export default function Dashbord({setAuth}) {
    const [name, setName] = useState("");
    
async function getName(){
    try {
        const res = await fetch("http://localhost:5000/dashboard/", {
            method: "GET",
            headers: {token: localStorage.token}
        })
        const parseRes = await res.json()
        setName(parseRes.user_name)
    } catch (error) {
        console.log(error.message);
    }
}

const logout = (e)=>{
e.preventDefault()
localStorage.removeItem("token");
setAuth(false)
}
    useEffect(()=>{
        getName()
    })
    return (
       <Fragment>
           <h1>dashboard</h1>
           <h3>Welcome Back {name}</h3>
           <button onClick={(e)=>logout(e)} className="btn btn-primary">Logout</button>

       </Fragment>
    )
}
