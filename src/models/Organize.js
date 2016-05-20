import config from '../constants/config.js'
import {
	CODE,
	ORGANIZE_STATE,
	EMPTY,
	RESULT
} from '../constants/enumerate.js'
import {
	isEmpty
} from '../utils/validation.js'
import fetch from 'isomorphic-fetch'

const INIT_ORGANIZE = {
	key: 0,
	token: '',
	oname: '',
	state: ORGANIZE_STATE.NORMAL,
	pwd: '',
	logo: '',
	cover: '',
	descript: ''
}
class Organize {
	// constructor(organize) {
	// 	Object.assign(this, INIT_ORGANIZE, organize)
	// }
	static add(organize) {
		//TODO:check argument valid
		// if () {
		// 	return Object.assign({}, RESULT, {
		// 		msg: EMPTY
		// 	})
		// }
		let _organize = Object.assign( {},INIT_ORGANIZE,organize )
		return fetch(`${config.api}organize/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `key=${_organize.key}&token=${_organize.token}&logo=${_organize.logo}&oname=${_organize.oname}&pwd=${_organize.pwd}&state=${_organize.state}&cover=${_organize.cover}&descript=${_organize.descript}`
		}).then(response => {
			return response.ok ? response.json() : Promise.reject(Object.assign({}, RESULT, {
				msg: response.statusText
			}))
		}).catch(error => {
			return error
		}).then(data => {
			return data.code === CODE.NORMAL ?
				Object.assign({}, RESULT, {
					code: CODE.NORMAL,
					msg: '',
					data:{
						id:data.identity
					}
				}) : Object.assign({}, RESULT, {
					msg: data.msg
				})
		})
	}
	static edit(organize){
		
	}
	static get(queryArgs){
		
	}
}

export default Organize