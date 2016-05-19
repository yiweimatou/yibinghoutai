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

class Organize {
	constructor(organize){
		Object.assign(this,{
			key:0,
			token:'',
			oname:'',
			state:ORGANIZE_STATE.NORMAL,
			pwd:'',
			logo:'',
			cover:'',
			descript:''
		},organize)
	}
	add(){
		//TODO:check argument valid
		// if () {
		// 	return Object.assign({}, RESULT, {
		// 		msg: EMPTY
		// 	})
		// }
		return fetch(`${config.api}organize/add`, {
			method: 'POST',
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `key=${this.key}&token=${this.token}&logo=${this.logo}&oname=${this.oname}&pwd=${this.pwd}&state=${this.state}&cover=${this.cover}&descript=${this.descript}`
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
					msg: ''
				}) : Object.assign({}, RESULT, {
					msg: data.msg
				})
		})
	}
}

export default Organize