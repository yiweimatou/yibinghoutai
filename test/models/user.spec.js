import test from 'ava'
import user from '../../src/models/user'

test('user login',async t => {
	const result = await user.login(1,2)
	t.is(result.msg,'xxx')
});