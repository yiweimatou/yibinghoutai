import config from '../constants/config.js'
import {
	CODE,
	ORGANIZE_STATE,
	EMPTY,
	RESULT
} from '../constants/enumerate.js'
import {
	object2string
} from '../utils/convert.js'
import {
	isEmpty
} from '../utils/validation.js'
import fetch from 'isomorphic-fetch'

class Organize {
	static add(organize) {
		//check argument valid
		if (typeof organize !== 'object' || !('key' in organize) || !('token' in organize) || !('oname' in organize) || !('pwd' in organize) || !('logo' in organize) || !('state' in organize)) {
			return Object.assign({}, RESULT, {
				msg: EMPTY
			})
		}
		const queryString = object2string(organize)
		return fetch(`${config.api}organize/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: queryString
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
						id: data.identity
					}
				}) : Object.assign({}, RESULT, {
					msg: data.msg
				})
		}).catch(error => {
			return error
		})
	}
	static edit(organize) {
		if (typeof organize !== 'object' || !('key' in organize) || !('token' in organize) || !('oid' in organize)) {
			return Object.assign({}, RESULT, {
				msg: EMPTY
			})
		}
		const queryString = object2string(organize)
		return fetch(`${config.api}organize/put`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: queryString
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
		}).catch(error => {
			return error
		})
	}
	static get(queryArgs) {
		if (typeof queryArgs !== 'object') {
			return Object.assign({}, RESULT, {
				msg: EMPTY
			})
		}
		const queryString = object2string(queryArgs)
		return fetch(`${config.api}organize/get?${queryString}`).then(response => {
			return response.ok ? response.json() : Promise.reject(Object.assign({}, RESULT, {
				msg: response.statusText
			}))
		}).then(data => {
			return data.code === CODE.NORMAL ?
				Object.assign({}, RESULT, {
					code: CODE.NORMAL,
					msg: '',
					data: {
						organize: data.get
					}
				}) : Object.assign({}, RESULT, {
					msg: data.msg
				})
		}).catch(error => {
			return error
		})

	}
	static remove(key, token, oid) {
		if (isEmpty(key) || isEmpty(token) || isEmpty(oid)) {
			return Object.assign({}, RESULT, {
				msg: EMPTY
			})
		}
		return fetch(`${config.api}organize/del?key=${key}&token=${token}&oid=${oid}`, {
			method: 'DELETE'
		}).catch(error=>{
			return Promise.reject(Object.assign({}, RESULT, {
				msg: error.message
			}))
		}).then(response => {
			return response.ok ? response.json() : Promise.reject(Object.assign({}, RESULT, {
				msg: response.statusText
			}))
		}).catch(error=>{
			return error
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
	static info(queryArgs) {
		const queryString = object2string(queryArgs)
		return fetch(`${config.api}organize/info?${queryString}`).then(response => {
			return response.ok ? response.json() : Promise.reject(Object.assign({}, RESULT, {
				msg: response.statusText
			}))
		}).then(data => {
			return data.code === CODE.NORMAL ?
				Object.assign({}, RESULT, {
					code: CODE.NORMAL,
					msg: '',
					data: {
						count: data.count
					}
				}) : Object.assign({}, RESULT, {
					msg: data.msg
				})
		}).catch(error => {
			return error
		})
	}
	static list(queryArgs) {
		const queryString = object2string(queryArgs)
		if (queryString === '') {
			return Object.assign({}, RESULT, {
				msg: EMPTY
			})
		}
		return fetch(`${config.api}organize/list?${queryString}`).then(response => {
			return response.ok ? response.json() : Promise.reject(Object.assign({}, RESULT, {
				msg: response.statusText
			}))
		}).then(data => {
			return data.code === CODE.NORMAL ?
				Object.assign({}, RESULT, {
					code: CODE.NORMAL,
					msg: '',
					data: data.list
				}) : Object.assign({}, RESULT, {
					msg: data.msg
				})
		}).catch(error => {
			return error
		})
	}
}

export default Organize