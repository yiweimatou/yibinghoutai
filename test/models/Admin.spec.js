import test from 'ava'
import Admin from '../../src/models/Admin'
import {
	CODE
} from '../../src/constants/enumerate.js'

const key = 2
var token
test('admin login failed',async t => {
	const result = await Admin.login('zhangruofan','12345')
	const expectResult = {
		code:CODE.INIT,
		msg:'密码错误'
	}
	t.deepEqual(result,expectResult)
})

test('admin login successfully',async t => {
	const result = await Admin.login('zhangruofan','123456')
	t.is(result.code,CODE.NORMAL)
	t.is(result.data.key,key)
	t.true(result.data.token.length > 0)
	token = result.data.token
})

test.after('after admin login',async t => {
	const valid = await Admin.valid(key,token)
	t.is(valid.code,CODE.NORMAL,'key token is valid')
	const changePwd = await Admin.changePwd(key,token,'123456')
	t.is(changePwd.code,CODE.NORMAL,'change password to 123456')
	const logout = await Admin.logout(key,token)
	t.is(logout.code,CODE.NORMAL,'login out successfully')
})