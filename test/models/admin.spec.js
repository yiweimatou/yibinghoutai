import test from 'ava'
import admin from '../../src/models/admin'
import md5 from 'md5'

test('admin login',async t => {
	const result = await admin.login('zhangruofan','123456')
	t.is(result.code, 0)
})