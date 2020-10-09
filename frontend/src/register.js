import React from 'react';
import '../src/assets/login.css'
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  NavLink
} from "react-router-dom";
class Register extends React.Component{
    render(){
        return (
            <>
        <div className="sidenav">
         <div className="login-main-text">
            <h2>QuickMessage<br /> Register Page</h2>
            <p>Login or register from here to access messaging service.</p>
         </div>
      </div>
      <div className="main">
         <div className="col-md-6 col-sm-12">
            <div className="login-form">
               <form>
                  <div className="form-group">
                     <label>User Name</label>
                     <input type="text" className="form-control" placeholder="User Name" />
                  </div>
                  <div className="form-group">
                     <label>Email</label>
                     <input type="text" className="form-control" placeholder="User Name" />
                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input type="password" className="form-control" placeholder="Password" />
                  </div>
                  <div className="form-group">
                     <label>Repeat Password</label>
                     <input type="password" className="form-control" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-black">Login</button>
                  <br />
                  
               </form>

            </div>

         </div>
         <p style={{marginLeft: "15px"}}> If you have an account, <a href='/login'>login</a> here</p>

      </div> 
      </>)
    }


}

export default Register;