import { Fragment, useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./component/Dashbord";
import Login from "./component/Login";
import Register from "./component/Register";

function App() {
  const [isAuthonticated, setIsAuthonticated] = useState(false);
  const setAuth = (boolean) =>{
setIsAuthonticated(boolean)
  }
  async function  isAuth(){
    try {
      const res = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token}
      })
      const parseRes = await res.json();
      parseRes=== true? setIsAuthonticated(true): setIsAuthonticated(false)
    } catch (error) {
      console.log(error.message);
    }

  }

  useEffect(() => {
    isAuth()
  }, [])

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthonticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthonticated ? (
                  <Register {...props}  setAuth={setAuth}/>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthonticated ? (
                  <Dashboard {...props}  setAuth={setAuth}/>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
