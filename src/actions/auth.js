import fetch from 'isomorphic-fetch'
import {
    OK,
    ADMIN_LOGIN_API,
    ADMIN_LOGOUT_API,
    ADMIN_EDIT_API
} from '../constants/api'
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED
} from '../constants/ActionTypes'
import { toastr } from 'react-redux-toastr'

export const changepwd = (oldpwd,pwd) => {
    return (dispatch,getState) => {
        const user = getState().auth.user
        return fetch(ADMIN_EDIT_API,{
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            method:'PUT',
            body:`key=${user.id}&token=${user.token}&old_pwd=${oldpwd}&pwd=${pwd}`
        }).then( response => {
            if( response.ok ){
                return response.json()
            }else{
                throw new Error( response.statusText )
            }
        }).then( data => {
            if( data.code === OK ){
                toastr.success( '修改成功!')
            }else{
                throw new Error( data.msg )
            }
        }).catch( error => {
            toastr.error( error.message )
        })
    }
}
/**
 * login
 */
export const startLogin = () => {
    return {
        type: LOGIN
    }
}

export const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        account:payload.account,
        id: payload.id,
        token: payload.token
    }
}

export const loginFail = error => {
    return {
        type: LOGIN_FAIL,
        error
    }
}

export const login = (account, pwd) => {
        return dispatch => {
            dispatch(startLogin())
            return fetch(ADMIN_LOGIN_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `account=${account}&pwd=${pwd}`
            }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            }).then(data => {
                if (data.code === OK) {
                    dispatch(loginSuccess({
                        account:account,
                        id: data.key,
                        token: data.token
                    }))
                    localStorage['__INITIAL_STATE__']
                    =JSON.stringify({
                        auth:{
                            user:{
                                account:account,
                                id:data.key,
                                token:data.token
                            },
                            status:AUTHENTICATED
                        }
                    })
                    toastr.success('登录成功!')
                    return data
                } else {
                    throw new Error(data.msg)
                }
            }).catch(error => {
                dispatch(loginFail(error.message))
            })
        }
    }
    /**
     * logout
     */
export const startLogout = () => {
    return {
        type: LOGOUT
    }
}

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const logoutFail = error => {
    return {
        type: LOGOUT_FAIL,
        error
    }
}
export const logout = () => {
    return (dispatch,getState) => {
        const user = getState().auth.user
        return fetch(`${ADMIN_LOGOUT_API}?key=${user.id}&token=${user.token}`
        ).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if (data.code === OK) {
                dispatch(logoutSuccess())
                toastr.success('登出成功!')
            } else {
                throw new Error(data.msg)
            }
        }).catch(error => {
            toastr.error( error.message )
        })
    }
}