import React from 'react';
import ContactsMenu from './ContactsMenu';
import WSInstance from './WebSocket';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';
import { withRouter} from 'react-router-dom';


class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {}

        this.waitForSocketConnection(()=> {
            WSInstance.addCallbacks(
                this.setMessages.bind(this),
                this.addMessage.bind(this));
            WSInstance.fetchMessages('foucault');
            
        }) 
   
    }
 
    addMessage(message){
        this.setState({
             messages: [...this.state.messages, message]
        })
    }

    setMessages(messages){
        this.setState({messages: messages})
    }
    
    formatMessageDate(date){
        var values = [
            date.getFullYear(),
            date.getMonth()+1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
         ];
        return `${values[0]}:${values[1]}:${values[2]} - ${values[3]}:${values[4]}`
    }

    renderMessages = (messages) => {
        const currentUser = 'Aleph';
        const mm = messages.map(message => {
        return ((message.author === currentUser)?
            (<div key={message.id} className="outgoing_msg">
              <div className="sent_msg">
                <p>{message.content}</p>
                <span className="time_date"> {this.formatMessageDate(new Date(message.timestamp))}</span> 
              </div>
            </div>)
            :
            ( <div key={message.id} className="incoming_msg">
             <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
             <div className="received_msg">
               <div className="received_withd_msg">
                 <p>{message.content}</p>
                 <span className ="time_date">{this.formatMessageDate(new Date(message.timestamp))}</span></div>
             </div>
           </div>))
            
        })

        console.log(`mm`)
        console.log(mm)
        return mm;
    }

  

    waitForSocketConnection(callback){
        const component = this;
        setTimeout(
            function (){
                if(WSInstance.state() === 1){
                    console.log('connection is secure')
                    callback();
                    return;
                } else {
                    console.log('waiting for connection');
                    component.waitForSocketConnection(callback);
                }
            }, 100
        )
    }
    sendMessageHandler(event){
        event.preventDefault(); 
        const messageObject = {
            from : 'Aleph',
            content: this.state.message
        }

        WSInstance.newMessage(messageObject);
        this.setState({
            message: ''
        })
    }

    messageChangeHandler(event){
        this.setState({
            message: event.target.value
        });
    }

    
    render(){
        const messages = this.state.messages;
        console.log('this.props.isAuthenticated')
        console.log(this.props.isAuthenticated)
        return (
            <div className="container">
            <div className="messaging">
            <button onClick={this.props.logout}>Logout</button>
            <a href='/login'>Login</a>

                <div className="inbox_msg">
                    <ContactsMenu />
                    <div className="mesgs">
                    <div className="msg_history">
                        <div className="incoming_msg">
                        <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil "/> </div>
                        <div className="received_msg">
                            <div className="received_withd_msg">
                            <p>Test which is a new approach to have all
                                solutions</p>
                            <span className="time_date"> 11:01 AM    |    June 9</span></div>
                        </div>
                        </div>
                        <div className="outgoing_msg">
                        <div className="sent_msg">
                            <p>{this.props.isAuthenticated? <h2>AUTH_OK</h2> : <h2> AUTH_NOT_OK</h2>}</p>
                            <span className="time_date"> 11:01 AM    |    June 9</span> </div>
                        </div>
                        {
                                messages && 
                                this.renderMessages(messages)
                        }
                    </div>
                    <div className="type_msg">
                        <form onSubmit={this.sendMessageHandler.bind(this)}>
                            <div className="input_msg_write">
                            <input type="text" className="write_msg" 
                                onChange={this.messageChangeHandler.bind(this)} 
                                value={this.state.message}
                                placeholder="Type a message" />
                            <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                
                
                {/*<p className="text-center top_spac"> Design by <a target="_blank" href="#">Sunil Rajput</a></p>*/}
                
                </div></div>

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
      
        logout: ()=> {
            console.log('logout run!!!!!')
            dispatch(actions.logout())}
        
    }
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));