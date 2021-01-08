import React, { Fragment, useState } from "react";

export default function Register() {
  return (
    <Fragment>
      <h1>Resgister</h1>
      
      <form>
        <input type="email" name="email" placeholder="email" className="form-control"/>
        <input type="password" name="password" placeholder="password" className="form-control"/>
        <input type="text" name="name" placeholder="name" className="form-control"/>
      </form>
    </Fragment>
  );
}
