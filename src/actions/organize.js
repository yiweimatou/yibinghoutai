import fetch from 'isomorphic-fetch'
import {
    ORGANIZE_ADD_API
} from 'constants/api'
import {
    object2string
} from '../utils/convert'

export const ADD_ORGANIZE_REQUEST = 'ADD_ORGANIZE_REQUEST'
export const ADD_ORGANIZE_SUCCESS = 'ADD_ORGANIZE_SUCCESS'
export const ADD_ORGANIZE_FAILURE = 'ADD_ORGANIZE_FAILURE'

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