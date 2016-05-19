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

const admin = {
	login: (account, pwd) => {
		let result = Object.assign({},RESULT,{data:{}})
		if (isEmpty(account) || isEmpty(pwd)) {
			result.msg = EMPTY
			return result
		}
		return fetch(`${config.api}admin/login?account=${account}&pwd=${md5(pwd)}`, {
			method: 'POST'
		}).then(response => {
			if (response.ok) {
				return response.json()
			} else {
				result.msg = response.statusText
				return Promise.reject(result.msg)
			}
		}).then(data => {
			if (data.code === CODE.NORMAL) {
				result.code = CODE.NORMAL
				result.data.key = data.key
				result.data.token = data.token
			} else {
				result.msg = data.msg
			}
			return result
		})
	},
	changePwd: (key, token, pwd) => {
		let result = {
			code: CODE.INIT,
			msg: INITMSG
		}
		if (isEmpty(key) || isEmpty(token) || isEmpty(pwd)) {
			result.msg = EMPTY
			return result
		}
		return fetch(`${config.api}admin/put?key=${key}&token=${token}&pwd=${md5(pwd)}`, {
			method: 'PUT'
		}).then(response => {
			if(response.ok){
				return response.json()
			}else{
				result.msg = response.statusText
				return Promise.reject(result)
			}
		}).then(data => {
			data.code === CODE.NORMAL ? result.code = CODE.NORMAL : result.msg = data.msg
			return result
		})
	},
	logout: (key, token) => {
		let result = {
			code: CODE.INIT,
			msg: INITMSG
		}
		if (isEmpty(key) || isEmpty(token)) {
			result.msg = EMPTY
			return result
		}
		return fetch(`${config.api}admin/logout?key=${key}&token=${token}`, {
			method: 'get'
		}).then(response => {
			if (response.ok) {
				return response.json()
			} else {
				result.msg = response.statusText
				return Promise.reject(result)
			}
		}).then(data => {
			data.code === CODE.NORMAL ? result.code = CODE.NORMAL : result.msg = data.msg
			return result
		})
	},
	valid: (key, token) => {
		let result = {
			code: CODE.INIT,
			msg: INITMSG
		}
		if (isEmpty(key) || isEmpty(token)) {
			result.msg = EMPTY
			return result
		}
		return fetch(`${config.api}admin/valid?key=${key}&token=${token}`, {
			method: 'get'
		}).then(response => {
			if (response.ok) {
				return response.json()
			} else {
				result.msg = response.statusText
				return Promise.reject(result)
			}
		}).then(data => {
			data.code === CODE.NORMAL ? result.code = CODE.NORMAL : result.msg = data.msg
			return result
		})
	}
}

export default admin