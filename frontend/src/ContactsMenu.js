import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';
import './assets/contact.css'

function fakeQuerySource(){
    var users = {
        users: [
            {
                name:'Louis',
                date:'10101',
                last_message:'Hello world',
            },
            {
                name:"furkan",
                date:'10101',
                last_message:'bye bye world',
            },
            {
                name:'Aleph',
                date:'2',
                last_message:'good',
            }
        ]
    }
    return users;

}

const Contact = (props) => ( 
    <li className='list-unstyled' key={props.user.name}>
    <div className="chat_list" >
    <div className="chat_people">
        <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
        <div className="chat_ib">
        <h5>{props.user.name} <span className="chat_date">{props.user.date}</span></h5>
        <p>{props.user.last_message}.</p>
        </div>
    </div>
    </div>
    </li>
)


class ContactsMenu extends React.Component{
    // NOTE: add 'active_chat class dynamicly'
 
componentWillReceiveProps(newProps){
    
}

    listView = (source)=> {
        return source().users.map( (user)=> {
            return (
                <Contact user={user}/>
                )
            }
        )
    }

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
           
            {this.listView(fakeQuerySource)}
                
            </div>
            </div>
        )
    }
} 

const mapStateToProps = state => {
    console.log('state.token')
    console.log(state)
    return {
        isAuthenticated: state.token !== null,
        token:state.token,
        username:state.username,

    }
}
 

const mapDispatchToProps = dispatch => {
    return {
        logout: ()=> dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsMenu);