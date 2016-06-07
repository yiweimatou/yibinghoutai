import {
    REGION_GET_API,
    REGION_LIST_API,
    REGION_INFO_API
} from '../constants/api'
import {
    object2string
} from 'utils/convert'
import fetch from 'isomorphic-fetch'

export const GET_REGION_REQUEST = 'GET_REGION_REQUEST'
export const GET_REGION_SUCCESS = 'GET_REGION_SUCCESS'
export const GET_REGION_FAILURE = 'GET_REGION_FAILURE'

export const info = args => {
    return fetch(`${REGION_INFO_API}?${object2string(args)}`)
        .then(response => {
            if (response.ok) {
                return response
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

export const get = args => {
    return fetch(`${REGION_GET_API}?${object2string(args)}`)
        .then(response => {
            if (response.ok) {
                return response
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

export const list = args => {
    return fetch(`${REGION_LIST_API}?${object2string(args)}`)
        .then(response => {
            if (response.ok) {
                return response
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