import md5 from 'md5'
import config from '../constants/config.js'
import {isEmpty} from '../utils/validation.js'
import Code from '../constants/Code.js'
import fetch from 'isomorphic-fetch'

const INITMSG = 'unkown error'
const EMPTY = 'arguments is empty'
const admin = {
	login: async (account,pwd)=>{
		let result = {
			code : Code.INIT,
			msg : INITMSG
		}
		if(isEmpty(account) || isEmpty(pwd)){
			result.msg = EMPTY
			return result
		}
		await fetch(`${config.api}admin/login?account=${account}&pwd=${md5(pwd)}`)
		.then(response=>{
			if(response.ok){
				return response.json()
			}else{
				result.msg = response.statusText
				return Promise.reject(result.msg)
			}
		}).then(data=>{
			console.log(data)
			data.code === Code.NORMAL ? result.code = Code.NORMAL:result.msg = data.msg
		})
		return result
	},
	changePwd:async (key,token,pwd)=>{
		let result = {
			code : Code.INIT,
			msg : INITMSG
		}
		if(isEmpty(key) || isEmpty(token) || isEmpty(pwd)){

		}
	}
}

export default admin