import test from 'ava'
import {
    CODE,
    EMPTY,
    ORGANIZE_STATE,
    EXPECT_RESULT
} from '../../src/constants/enumerate'
import Chance from 'chance'
import Organize from '../../src/models/Organize'
import Admin from '../../src/models/Admin.js'


/**
 * 1.get key,token,organize info
 * 2.add organize
 * 3.edit organize
 * 4.get an organize
 * 5.get an organize list
 * 6.delete added organize
 * 7.check organize info
 */
var key, token, count, oid
const chance = new Chance()
const oname = chance.string()
const pwd = chance.natural({
    min: 100000,
    max: 999999
})
const EXPECT_NAME = 'test'
test.before('do the prepare thing', async t => {
    const result = await Admin.login('zhangruofan', '123456')
    t.is(result.code, CODE.NORMAL)
    key = result.data.key
    token = result.data.token
    const info = await Organize.info()
    t.is(info.code, CODE.NORMAL)
    count = info.data.count
})
test('add, edit and remove organize', async t => {
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
    const result = await Organize.add(toBeAddOrganize)
    t.is(result.code, CODE.NORMAL, 'add checked')
    oid = result.data.id
    
    const edit = await Organize.edit({
        oname: EXPECT_NAME,
        key:key,
        token:token,
        oid:oid
    })
    t.deepEqual(edit, EXPECT_RESULT, 'edit checked')

    const get = await Organize.get({
        oid: oid
    })
    t.is(get.data.organize.oname, EXPECT_NAME, 'get checked')

    const list = await Organize.list({
        oid: oid
    })
    t.is(list.data[0].oname, EXPECT_NAME, 'list checked')

    const remove = await Organize.remove(key, token, oid)
    t.deepEqual(remove, EXPECT_RESULT, 'remove checked')
})
test.after('check organize', async t => {
    const info = await Organize.info({
        state: ORGANIZE_STATE.NORMAL
    })
    t.is(info.code, CODE.NORMAL, 'info checked')
    t.is(info.data.count, count, 'all checked')
})