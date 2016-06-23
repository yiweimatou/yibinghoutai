import fetch from 'isomorphic-fetch'
import config from '../constants/config'
import md5 from 'md5'

const user = {
    get: async (id) => {
        return {

        }
    },
    login: async (account, pwd) => {
        let result = {
            code: -1,
            msg: 'Unknow Error'
        }
        await fetch(`${config.api}admin/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                account: account,
                pwd: md5(pwd)
            }
        }).then(response => {
            return response.ok ?
                response.json :
                result.msg = response.statusText && Promise.reject(new Error(response.statusText))
        }).then(data => {
            if (data.code === 0) {
                result.code = 0
            }
        })
        return result
    }
}

export default user