import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './src/Chat';
import WSInstance from './src/WebSocket';
import App from './App'
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import reducer from './store/reducers/auth';
import Login from './src/login'
import Register from './src/register'


const composeEnhances = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk)
))

const Test = (props) => {
    return (
        <p>WORKS WOW</p>
    )
}

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }


class Dapp extends React.Component{
    componentDidMount(){
        WSInstance.connect();

    }
    render(){
        return (
            <ErrorBoundary>
            <Provider store={store}>
           <App />
            </Provider>
            </ErrorBoundary>
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
        onTryAutoSignup: ()=> {
            console.log('autho  run!!!!!')
            
            dispatch(actions.authCheckState())
        }
       
    }
}

ReactDOM.render(<Dapp />, document.getElementById('app'))