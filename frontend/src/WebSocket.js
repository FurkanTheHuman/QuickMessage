class WebSocketJS {

    static instance = null;
    callbacks = {}

    static getInstance(){
        if(!WebSocketJS.instance){
            WebSocketJS.instance = new WebSocketJS();
        }
        return WebSocketJS.instance;
    }

    constructor(){
        this.socket = null;
    }

    connect(){
        const path = 'ws://127.0.0.1:8000/ws/chat/test/';
        this.socket = new WebSocket(path);
        this.socket.onopen = () =>{
            console.log('web socket open');
        }
  
        this.socket.onmessage = (e) =>{
            console.log('web socket message');
            //this might be redundant
            this.newResponse(e.data)
        }
        this.socket.onerror = (e) =>{
            console.log('web socket error', e);
        }
        this.socket.onclose = () =>{
            console.log('web socket close');
            setTimeout(()=> {
                this.connect();
            }, 500);
        }
   
    }
    newResponse(data){
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (command === 'messages' ) {
            this.callbacks[command](parsedData.messages)
        }
        if (command === 'new_message' ) {
            this.callbacks[command](parsedData.message)
        }
    }

    fetchMessages(username){
        this.sendMessage({command: 'fetch_messages', username:username})
    }
    
    newMessage(message){
        this.sendMessage({command: 'new_message', from:message.from, message: message.content})
    }

    addCallbacks(f, n){
        this.callbacks['messages'] = f;
        this.callbacks['new_message'] = n;
        console.log(this.callbacks)
    }

    sendMessage(data){
        try{
            console.log('{...data}')
            console.log({...data})
            this.socket.send(JSON.stringify({...data}))
        }catch(e) {
            console.log(e.message)
        }
    }

    state(){
        return this.socket.readyState;
    }

    waitForSocketConnection(callback){
        const socket = this.socket;
        const recursion = this. waitForSocketConnection;
        setTimeout(
            function (){
                if(socket.readyState === 1){
                    console.log('connection is secure')
                    if (callback != null){
                        callback();
                    }
                    return;
                } else {
                    console.log('waiting for connection');
                    recursion(callback);
                }
            }, 100
        )
    }

}

const WSInstance = WebSocketJS.getInstance();


export default WSInstance;