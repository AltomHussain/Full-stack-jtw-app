import React,{Fragment} from 'react'

export default function Dashbord({setAuth}) {
    return (
       <Fragment>
           <h1>dashboard</h1>
           <button onClick={()=>setAuth(false) }>Logout</button>

       </Fragment>
    )
}
