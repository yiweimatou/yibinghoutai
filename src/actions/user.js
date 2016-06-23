import fetch from 'isomorphic-fetch'
import {
    USER_GET_API,
    USER_ADD_API,
    USER_INFO_API,
    USER_LIST_API,
    USER_EDIT_API,
    OK
} from 'constants/api'
import {
    object2string
} from '../utils/convert'
import { toastr } from 'react-redux-toastr'


export const ADD_USER_REQUEST = 'ADD_USER_REQUEST'
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'
export const ADD_USER_FAILUIRE = 'ADD_USER_FAILUIRE'

export const USER_LIST_REQUEST = 'USER_LIST_REQUEST'
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
export const USER_LIST_FAILURE = 'USER_LIST_FAILURE'

export const UPDATE_USER_TOTAL = 'UPDATE_USER_TOTAL'
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS'
export const USER_GET_FAILURE = 'USER_GET_FAILURE'

export const get = (args) => {
    return (dispatch,getState) =>{
        const user = getState().auth.user
        return fetch(`${USER_GET_API}?key=${user.id}&token=${user.token}&${object2string(args)}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            }).then(data => data).catch(error => {
                return {
                    msg: error.message
                }
            })
    }
}

export const getUserSuccess = (user) =>{
    return {
        type:USER_GET_SUCCESS,
        user
    }
}

export const getUserFailure = message => {
    return {
        type:USER_GET_FAILURE,
        message
    }
}

export const getUserIfNeeded = args => {
    return (dispatch,getState) => {
        const _user = getState().user
        if(_user &&　_user.detail && _user.detail.uid === args.uid){
            return _user.detail
        }
        if( _user && _user.list ){
            const detail = _user.list.find( item => {
                return item.uid === args.uid
            })
            if(detail){
                 dispatch(getUserSuccess(detail))
                 return detail
            }
        }
        return dispatch(get(args)).then(data => {
            if(data.code === OK && data.get.uid > 0){
                dispatch(getUserSuccess(data.get))
                return data.get
            }else{
                throw new Error(data.msg || '找不到该用户')
            }
        }).catch(error => {
             console.error( error.message )
        })
    }
}

export const info = (key,token,args) => {
    return fetch(`${USER_INFO_API}?key=${key}&token=${token}&${object2string(args)}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => data).catch(error => {
            return {
                msg: error.message
            }
        })
}

export const fetchInfo = (args) => {
    return (dispatch,getState) => {
        const user = getState().auth.user
        return info(user.id,user.token,args).then(data => {
            if(data.code === OK){
                dispatch({
                    type:UPDATE_USER_TOTAL,
                    count:data.count
                })
            }
        })
    }
}

export const add = (args) => {
    return (dispatch, getState) => {
        const user =  getState().auth.user
        args.key = user.id
        args.token = user.token
        return fetch(`${USER_ADD_API}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: object2string(args)
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => data).catch(error => {
            return {
                msg: error.message
            }
        })
    }
}

export const startAddUser = () => {
    return {
        type: ADD_USER_REQUEST
    }
}

export const addUserSuccess = () => {
    return {
        type: ADD_USER_SUCCESS
    }
}

export const addUserFailure = (message) => {
    return {
        type: ADD_USER_FAILUIRE,
        message
    }
}

export const addUser = (args) => {
    return (dispatch, getState) => {
        dispatch(startAddUser())
        const user = getState().auth.user
        args.key = user.id
        args.token = user.token
        return add(args).then(data => {
            if (data.code === OK) {
                toastr.success( '新建用户成功!' )
            } else {
                // dispatch(addUserFailure(data.msg || '新建用户失败'))
                throw new Error(
                    data.msg || '新建用户失败'
                )
            }
        }).catch(error => {
            toastr.error( error.message )
        })
    }
}

export const startFetchUserList = () => {
    return {
        type: USER_LIST_REQUEST
    }
}

export const fetchUserListSuccess = (list, offset) => {
    return {
        type: USER_LIST_SUCCESS,
        list,
        offset
    }
}

export const fetchUserListFailure = (message) => {
    return {
        type: USER_LIST_FAILURE,
        message
    }
}
export const fetchUserList = (args) => {
    return (dispatch, getState) => {
        dispatch(startFetchUserList())
        const user = getState().auth.user
        return fetch(`${USER_LIST_API}?key=${user.id}&token=${user.token}&${object2string(args)}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            }).then(data => {
                if (data.code === OK) {
                    dispatch(fetchUserListSuccess(data.list, args.offset || 1))
                } else {
                    dispatch(fetchUserListFailure(data.msg || '获取列表失败!'))
                }
            }).catch(error => {
                dispatch(fetchUserListFailure(error.message))
            })
    }
}

export const edit = (args) => {
    return (dispatch,getState) => {
        const user = getState().auth.user
        return fetch(`${USER_EDIT_API}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`key=${user.id}&token=${user.token}&${object2string(args)}`
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            }else{
                throw new Error(response.statusText)
            }
        }).then(data => {
            if(data.code === OK){
                //update detail state
                dispatch(getUserSuccess(args))
                toastr.success('操作成功')
                return {
                    ok:true
                }
            }else{
                return {
                    msg:data.msg
                }
            }
        }).catch(error => {
            toastr.error( error.message )
        })
    }
}