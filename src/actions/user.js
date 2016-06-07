import fetch from 'isomorphic-fetch'
import {
    USER_GET_API,
    USER_ADD_API,
    USER_INFO_API,
    USER_LIST_API,
    OK
} from 'constants/api'
import {
    object2string
} from '../utils/convert'


export const ADD_USER_REQUEST = 'ADD_USER_REQUEST'
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'
export const ADD_USER_FAILUIRE = 'ADD_USER_FAILUIRE'

export const USER_LIST_REQUEST = 'USER_LIST_REQUEST' 
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
export const USER_LIST_FAILURE = 'USER_LIST_FAILURE'

export const get = (args) => {
    return fetch(`${USER_GET_API}?${object2string(args)}`)
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

export const info = (args) => {
    return fetch(`${USER_INFO_API}?${object2string(args)}`)
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

export const add = (user) => {
    return fetch(`${USER_ADD_API}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: object2string(user)
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

export const startAddUser = () => {
    return {
        type:ADD_USER_REQUEST
    }
}

export const addUserSuccess = () => {
    return {
        type:ADD_USER_SUCCESS
    }
}

export const addUserFailure = (message) => {
    return {
        type:ADD_USER_FAILUIRE,
        message
    }
}

export const addUser = (args) => {
    return (dispatch,getState) => {
        dispatch(startAddUser())
        const user =  getState().auth.user
        args.key = user.id
        args.token = user.token
        add(args).then( data => {
            if(data.code === OK){
                dispatch(addUserSuccess())
            }else{
                dispatch(addUserFailure(data.msg || '新建用户失败'))
            }
        })
    }
}

export const startFetchUserList = () => {
    return {
        type:USER_LIST_REQUEST
    }
}

export const fetchUserListSuccess = (list) => {
    return {
        type:USER_LIST_SUCCESS,
        list
    }
}

export const fetchUserListFailure = (message) => {
    return {
        type:USER_LIST_FAILURE,
        message
    }
}
export const fetchUserList = (args) => {
    return (dispatch,getState) => {
        dispatch(startFetchUserList())
        const user = getState().auth.user
        fetch(`${USER_LIST_API}?${object2string(args)}&key=${user.id}&token=${user.token}`)
        .then(response => {
            if(response.ok){
                return response.json()
            }else{
                throw new Error(response.statusText)
            }
        }).then(data => {
            if(data.code === OK){
                dispatch(fetchUserListSuccess(data.list))
            }else{
                dispatch(fetchUserListFailure(data.msg || '获取列表失败!'))
            }
        }).catch(error => {
            dispatch(fetchUserListFailure(error.message))
        })
    }
}