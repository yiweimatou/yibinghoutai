import {
    UPLOAD_COVER_API, OK, UPLOAD_LOGO_API
} from 'constants/api'
import fetch from 'isomorphic-fetch'
import {
    toastr
} from 'react-redux-toastr'

export const uploadCover = file => {
    let formData = new FormData()
    formData.append('upload_file', file)
    return fetch(UPLOAD_COVER_API, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error(response.statusText)
        }
    }).then(data => {
        if (data.code === OK) {
            return data.cover
        } else {
            throw new Error(data.msg)
        }
    }).catch(error => {
        toastr.error(error.message)
    })
}

export const uploadLogo = file => {
    let formData = new FormData()
    formData.append('upload_file', file)
    return fetch(UPLOAD_LOGO_API, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error(response.statusText)
        }
    }).then(data => {
        if (data.code === OK) {
            return data.logo
        } else {
            throw new Error(data.msg)
        }
    }).catch(error => {
        toastr.error(error.message)
    })
}