import fetch from 'isomorphic-fetch'
import {
    ORGANIZE_ADD_API,
    ORGANIZE_LIST_API,
    ORGANIZE_INFO_API,
    ORGANIZE_EDIT_API,
    OK
} from 'constants/api'
import { object2string } from '../utils/convert'
import { addErrorMessage } from 'actions/error'

export const ADD_ORGANIZE_REQUEST = 'ADD_ORGANIZE_REQUEST'
export const ADD_ORGANIZE_SUCCESS = 'ADD_ORGANIZE_SUCCESS'
export const ADD_ORGANIZE_FAILURE = 'ADD_ORGANIZE_FAILURE'

export const FETCH_ORGANIZE_LIST_REQUEST = 'FETCH_ORGANIZE_LIST_REQUEST'
export const FETCH_ORGANIZE_LIST_SUCCESS = 'FETCH_ORGANIZE_LIST_SUCCESS'
export const FETCH_ORGANIZE_LIST_FAILURE = 'FETCH_ORGANIZE_LIST_FAILURE'

export const UPDATE_ORGANIZE_TOTAL = 'UPDATE_ORGANIZE_TOTAL'

export const REMOVE_ORGANIZE_REQUEST = 'REMOVE_ORGANIZE_REQUEST'
export const REMOVE_ORGANIZE_SUCCESS = 'REMOVE_ORGANIZE_SUCCESS'
export const REMOVE_ORGANIZE_FAILURE = 'REMOVE_ORGANIZE_FAILURE'

export const add = (key, token, organize) => {
    return fetch(ORGANIZE_ADD_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `${object2string(organize)}&&key=${key}&&token=${token}`
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

export const list = (key,token,args) => {
    return fetch(`${ORGANIZE_LIST_API}?key=${key}&token=${token}&${object2string(args)}`)
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

export const info = (key,token,args) => {
    return fetch(`${ORGANIZE_INFO_API}?key=${key}&token=${token}&${object2string(args)}`)
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

export const startFetchList = () => {
    return {
        type:FETCH_ORGANIZE_LIST_REQUEST
    }
}

export const fetchListSuccess = (data,offset) => {
    return {
        type:FETCH_ORGANIZE_LIST_SUCCESS,
        list:data.list,
        lastFetchTime:data.sysdate,
        offset
    }
}

export const fetchListFailure = (errorMessage) => {
    return {
        type:FETCH_ORGANIZE_LIST_FAILURE,
        errorMessage
    }
}

export const fetchList = (key,token,args) => {
    return dispatch => {
        startFetchList()
        return list(key,token,args).then( data => {
            if(data.code === OK){
                return dispatch(fetchListSuccess(data,args.offset || 1))
            }else{
                return dispatch(fetchListFailure(data.msg))
            }
        })
    }
    
}

const shouldFetchList = (key,token,organizeList,args) => {
    return info(key,token,args).then(info => {
        if(info.code === OK){
            return {
                should:organizeList.lastFetchTime < info.timestamp,
                count:info.count
            }
        }else{
            return {
                should:false
            }
        }
    })
}

export const fetchListIfNeeded = (args) => {
    return (dispatch,getState) => {
        const user = getState().auth.user
        shouldFetchList(user.id,user.token,getState().organize,args).then(info=>{
            if(info.should){
                dispatch({
                    type:UPDATE_ORGANIZE_TOTAL,
                    total:info.count
                })
                return dispatch(fetchList(user.id,user.token,args))
            }
        })
    }
}

export const remove = (key,token,oid) => {
    return fetch(`${ORGANIZE_EDIT_API}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`oid=${oid}&key=${key}&token=${token}&oname=${oid}&state=3`
        }).then(response => {
            if(response.ok){
                return response.json()
            }else{
                throw new Error(response.statusText)
            }
        }).then(data => {
            if(data.code === OK){
                return {
                    ok:true
                }
            }else{
                throw new Error(data.msg)
            }
        }).catch(error => {
            return {
                ok:false,
                msg:error.message
            }
        })
}

export const removeRequest = oid => {
    return (dispatch,getState)=>{
        // dispatch({
        //     type:REMOVE_ORGANIZE_REQUEST
        // })
        const user = getState().auth.user
        remove(user.id,user.token,oid).then(data => {
            if(data.ok){
                dispatch({
                    type:REMOVE_ORGANIZE_SUCCESS,
                    oid:oid
                })
                dispatch(addErrorMessage('删除成功!'))
            }else{
                // dispatch({
                //     type:REMOVE_ORGANIZE_FAILURE,
                //     error:data.msg
                // })
                dispatch(addErrorMessage(data.msg))
            }
        })
    }
}