import md5 from 'md5'
import config from '../constants/config.js'
import {
	isEmpty
} from '../utils/validation.js'
import {
	CODE,
	EMPTY,
	RESULT
} from '../constants/enumerate.js'
import fetch from 'isomorphic-fetch'

const Admin = {
	loggedIn(){
		return (!!localStorage.id&&!!localStorage.token)
		||(!!sessionStorage.id&&!!sessionStorage.token)	
	},
	login(account, pwd) {
		if (isEmpty(account) || isEmpty(pwd)) {
			return Object.assign({}, RESULT, {
				msg: EMPTY
			})
		}
		return fetch(`${config.api}admin/login`, {
			method: 'POST',			
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `account=${account}&pwd=${md5(pwd)}`
		}).then(response => {
			return response.ok ? response.json() : Promise.reject(Object.assign({}, RESULT, {
				msg: response.statusText
			}))
		}).then(data => {
			return data.code === CODE.NORMAL ?
				Object.assign({}, RESULT, {
					code: CODE.NORMAL,
					msg: '',
					data: {
						key: data.key,
						token: data.token
					}
				}) : Object.assign({}, RESULT, {
					msg: data.msg
				})
		})
	},
	changePwd(key, token, pwd) {
		if (isEmpty(key) || isEmpty(token) || isEmpty(pwd)) {
			return Object.assign({}, RESULT, {
				msg: EMPTY
			})
		}
		return fetch(`${config.api}admin/put?key=${key}&token=${token}&pwd=${md5(pwd)}`, {
			method: 'PUT'
		}).then(response => {
			return response.ok ? response.json() : Promise.reject(Object.assign({}, RESULT, {
				msg: response.statusText
			}))
		}).then(data => {
			return data.code === CODE.NORMAL ?
				Object.assign({}, RESULT, {
					code: CODE.NORMAL,
					msg: ''
				}) : Object.assign({}, RESULT, {
					msg: data.msg
				})
		})
	},
	logout(key, token) {
		delete localStorage.id
		delete localStorage.token
		delete sessionStorage.id
		delete sessionStorage.token
		if (isEmpty(key) || isEmpty(token)) {
			return Object.assign({}, RESULT, {
				msg: EMPTY
			})
		}
		return fetch(`${config.api}admin/logout?key=${key}&token=${token}`, {
			method: 'get'
		}).then(response => {
			return response.ok ? response.json() : Promise.reject(Object.assign({}, RESULT, {
				msg: response.statusText
			}))
		}).then(data => {
			return data.code === CODE.NORMAL ?
				Object.assign({}, RESULT, {
					code: CODE.NORMAL,
					msg: ''
				}) : Object.assign({}, RESULT, {
					msg: data.msg
				})
		})
	},
	valid(key, token) {
		if (isEmpty(key) || isEmpty(token)) {
			return Object.assign({}, RESULT, {
				msg: EMPTY
			})
		}
		return fetch(`${config.api}admin/valid?key=${key}&token=${token}`, {
			method: 'get'
		}).then(response => {
			return response.ok ? response.json() : Promise.reject(Object.assign({}, RESULT, {
				msg: response.statusText
			}))
		}).then(data => {
			return data.code === CODE.NORMAL ?
				Object.assign({}, RESULT, {
					code: CODE.NORMAL,
					msg: ''
				}) : Object.assign({}, RESULT, {
					msg: data.msg
				})
		})
	}
}

export default Admin