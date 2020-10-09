import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';

class ContactsMenu extends React.Component{

    render(){
        return (
            <div className="inbox_people">
            <div className="headind_srch">
                <div className="recent_heading">
                <h4><button onClick={this.props.logout}>Logout</button></h4>
                </div>
                <div className="srch_bar">
                <div className="stylish-input-group">
                    <input type="text" className="search-bar"  placeholder="Search" />
                    <span className="input-group-addon">
                    <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                    </span> </div>
                </div>
            </div>
            <div className="inbox_chat">
                <div className="chat_list active_chat">
                <div className="chat_people">
                    <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                    <div className="chat_ib">
                    <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                    <p>Test, which is a new approach to have all solutions 
                        astrology under one roof.</p>
                    </div>
                </div>
                </div>
                <div className="chat_list">
                <div className="chat_people">
                    <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                    <div className="chat_ib">
                    <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                    <p>Test, which is a new approach to have all solutions 
                        astrology under one roof.</p>
                    </div>
                </div>
                </div>
            
                
            </div>
            </div>
        )
    }
} 

const mapStateToProps = state => {
    console.log('state.token')
    console.log(state)
    return {
        isAuthenticated: state.token !== null
    }
}
 

const mapDispatchToProps = dispatch => {
    return {
        logout: ()=> dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsMenu);