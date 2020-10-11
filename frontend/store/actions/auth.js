import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}



export const authSuccess = (token, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username
    }
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = ()=> {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('expirationDate')
    console.log(actionTypes.AUTH_LOGOUT)
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkTokenTimeout = expTime => {
    return dispatch => {
        setTimeout(()=> {
            console.log('shitttttt')
            dispatch(logout())
        }, expTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8000/rest-auth/login/', {
            username: username,
            password: password

        })
        .then( res => {
            const token = res.data.key;
            const expirationDate = new Date((new Date()).getTime() + 3600 * 1000 * 24);
            localStorage.setItem('token', token)
            console.log("localStorage.setItem('username', username)")
            console.log(username)
            localStorage.setItem('username', username)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(token, username))
            dispatch(checkTokenTimeout(3600 *24))
        }).catch(err =>{
            dispatch(authFail(err))
        })
    }
  
}

export const authSignup = (username, email, password, password_repeat) => {
    return dispatch => {
        dispatch(authStart);
        axios.post('http://localhost:8000/rest-auth/registeration/', {
            username: username,
            email: email,
            password: password,
            password_repeat: password_repeat

        })
        .then( res => {
            const token = res.data.key;
            const expirationData = new Date((new Date()).getTime() + 3600 * 1000  * 24);
            localStorage.setItem('token', token)
            localStorage.setItem('username', username)
            localStorage.setItem('expirationDate', expirationData)
            dispatch(authSuccess(token, username))
            dispatch(checkTokenTimeout(3600 * 24))
        }).catch(err =>{
            dispatch(authFail(err))
        })
    }
  
}

export const authCheckState = ()=> {
    console.log('exited api')

    return dispatch => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token === undefined) {
            console.log('exited pi')

            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            console.log("token exp")
            console.log(expirationDate)

            if(expirationDate <= new Date()){
                console.log('exited')
                dispatch(logout);
            }
            else{
                console.log(((expirationDate.getTime()- (new Date).getTime()) / 1000) * 10);
                dispatch(authSuccess(token, username));

                dispatch(checkTokenTimeout(((expirationDate.getTime()- (new Date).getTime()) / 1000) * 10))
            }
        }
    }
}