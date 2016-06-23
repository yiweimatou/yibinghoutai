import fetch from 'isomorphic-fetch'
import {
    ORGANIZE_ADD_API,
    ORGANIZE_LIST_API,
    ORGANIZE_INFO_API,
    ORGANIZE_EDIT_API,
    ORGANIZE_GET_API,
    OK
} from 'constants/api'
import {
    object2string
} from '../utils/convert'
import { toastr } from 'react-redux-toastr'
import { getUserIfNeeded } from 'actions/user'


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

export const GET_ORGANIZE_REQUEST = 'GET_ORGANIZE_REQUEST'
export const GET_ORGANIZE_SUCCESS = 'GET_ORGANIZE_SUCCESS'
export const GET_ORGANIZE_FAILURE = 'GET_ORGANIZE_FAILURE'

export const add = (organize) => {
    return ( dispatch,getState )=>{
        const user = getState().auth.user
    return fetch(ORGANIZE_ADD_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `${object2string(organize)}&key=${user.id}&token=${user.token}`
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error(response.statusText)
        }
    }).then(data => {
        if( data.code === OK ){
            toastr.success('新建成功!')
        }else{
            throw new Error( data.msg )
        }
    }).catch(error => {
        toastr.error( error.message )
    })
}
}

export const list = (key, token, args) => {
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

export const info = (key, token, args) => {
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
        type: FETCH_ORGANIZE_LIST_REQUEST
    }
}

export const fetchListSuccess = (list, offset) => {
    return {
        type: FETCH_ORGANIZE_LIST_SUCCESS,
        list,
        offset
    }
}

export const fetchListFailure = (errorMessage) => {
    return {
        type: FETCH_ORGANIZE_LIST_FAILURE,
        errorMessage
    }
}

export const fetchList = (args) => {
    return (dispatch, getState) => {
        const user = getState().auth.user
        return list(user.id, user.token, args).then(data => {
            if (data.code === OK) {
                if( data.list.length > 0 ){
                    Promise.all(data.list.slice().map( item =>{
                        return dispatch( getUserIfNeeded({uid:item.uid})).then(user=>{
                            item.mobile = user.mobile
                            return item
                        })
                    })).then( array=>{
                        dispatch(fetchListSuccess(array, args.offset || 1))
                        return array
                    })
                }else{
                    return null
                }
            } else {
                return toastr.error(data.msg)
            }
        })
    }
}

export const fetchInfo = (args) => {
    return (dispatch, getState) => {
        const user = getState().auth.user
        info(user.id, user.token, args).then(data => {
            if (data.code === OK) {
                dispatch({
                    type: UPDATE_ORGANIZE_TOTAL,
                    count: data.count
                })
            }
        })
    }
}

export const remove = (key, token, oid) => {
    return fetch(`${ORGANIZE_EDIT_API}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `oid=${oid}&key=${key}&token=${token}&oname=${oid}&state=3`
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error(response.statusText)
        }
    }).then(data => {
        if (data.code === OK) {
            return {
                ok: true
            }
        } else {
            throw new Error(data.msg)
        }
    }).catch(error => {
        return {
            ok: false,
            msg: error.message
        }
    })
}

export const removeRequest = oid => {
    return (dispatch, getState) => {
        // dispatch({
        //     type:REMOVE_ORGANIZE_REQUEST
        // })
        const user = getState().auth.user
        return remove(user.id, user.token, oid).then(data => {
            if (data.ok) {
                dispatch({
                    type: REMOVE_ORGANIZE_SUCCESS,
                    oid: oid
                })
                dispatch(addErrorMessage('删除成功!'))
            } else {
                // dispatch({
                //     type:REMOVE_ORGANIZE_FAILURE,
                //     error:data.msg
                // })
                dispatch(addErrorMessage(data.msg))
            }
        })
    }
}

export const get = (key, token, args) => {
    return fetch(`${ORGANIZE_GET_API}?key=${key}&token=${token}&${object2string(args)}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => data)
        .catch(error => {
            return {
                msg: error.message
            }
        })
}

export const startGet = () => {
    return {
        type: GET_ORGANIZE_REQUEST
    }
}

export const getSuccess = organize => {
    return {
        type: GET_ORGANIZE_SUCCESS,
        organize
    }
}

export const getFailure = message => {
    return {
        type: GET_ORGANIZE_FAILURE,
        message
    }
}

export const getOrganizeIfNeeded = args => {
    return (dispatch, getState) => {
        const organize = getState().organize
        if (organize.detail && organize.detail.oid === args.oid) {
            return
        }
        const detail = organize.list.find(item => {
            return item.oid == args.oid
        })
        if (detail) {
            return dispatch(getSuccess(detail))
        }
        const user = getState().auth.user
        return get(user.id, user.token, args).then(data => {
            if (data.code === OK && data.get.oid > 0) {
                return dispatch( getUserIfNeeded({uid:data.get.uid})).then(user=>{
                    return dispatch(getSuccess(Object.assign({},data.get,{mobile:user.mobile})))
                })
            } else {
                throw new Error(data.msg || '找不到该机构')
            }
        }).catch(error => {
            toastr.error(error.message)
        })
    }
}

export const edit = (args) => {
    return (dispatch, getState) => {
        const user = getState().auth.user
        return fetch(`${ORGANIZE_EDIT_API}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `${object2string(args)}&key=${user.id}&token=${user.token}`
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if (data.code === OK) {
                dispatch(getSuccess(args))
                toastr.success('编辑成功！')
            } else {
                throw new Error(data.msg)
            }
        }).catch(error => {
            toastr.error( error.message )
        })
    }
}