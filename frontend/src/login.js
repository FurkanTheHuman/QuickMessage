import React from 'react';
import {connect} from 'react-redux'
import '../src/assets/login.css'
import * as actions from '../store/actions/auth';

import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  NavLink
} from "react-router-dom";
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }


    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state)
        this.props.onAuth(this.state.username, this.state.password, false);
        this.props.history.push('/');
    }


    render(){
        let errMessage = null;
        if(this.props.error){
            errMessage = (
            <p>{this.props.error.message}</p>
            )
        }

        return (
            <div>
                {errMessage}
                {this.props.loading ? 
                <h2> LOADING </h2>   
                : 
                <>
                <form onSubmit={this.handleSubmit}>
        <div className="sidenav">
         <div className="login-main-text">
            <h2>QuickMessage<br /> Login Page</h2>
            <p>Login or register from here to access messaging service.</p>
         </div>
      </div>
      <div className="main">
         <div className="col-md-6 col-sm-12">
            <div className="login-form">
               <form>
                  <div className="form-group">
                     <label>User Name</label>
                     <input type="text" className="form-control" onChange={e => this.setState({username:e.target.value})} placeholder="User Name" />
                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input type="password" className="form-control" onChange={e => this.setState({password:e.target.value})} placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-black">Login</button>
                  <br />
                  
               </form>

            </div>

         </div>
         <p style={{marginLeft: "15px"}}> If you don't have an account, <a href='/register'>register</a> here</p>
         </div> 
         </form>
    </>
            }
      </div>)
    }


}
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}



export default connect(mapStateToProps, mapDispatchToProps )(Login)