import test from 'ava'
import {
    CODE,
    EMPTY,
    ORGANIZE_STATE
} from '../../src/constants/enumerate'
import Chance from 'chance'
import Organize from '../../src/models/Organize'
import Admin from '../../src/models/Admin.js'

var key, token

test.before('get key and token', async t => {
    const result = await Admin.login('zhangruofan', '123456')
    t.is(result.code, CODE.NORMAL)
    key = result.data.key
    token = result.data.token
})
test('add organize', async t => {
    const chance = new Chance()
    const oname = chance.string()
    const pwd = chance.natural({min:100000,max:999999})
    const toBeAddOrganize = {
        key: key,
        token: token,
        oname: oname,
        state: ORGANIZE_STATE.NORMAL,
        pwd: pwd,
        logo: 'logo',
        cover: 'cover',
        descript: 'descript'
    }
    const expectResult = {
        code: CODE.NORMAL,
        msg: ''
    }
    const result = await Organize.add(toBeAddOrganize)
    t.is(result.code, expectResult.code)
})