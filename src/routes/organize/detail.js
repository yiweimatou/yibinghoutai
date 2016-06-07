import {
    getSuccess,
    getOrganizeIfNeeded
} from 'actions/organize'
import {
    addErrorMessage
} from 'actions/error'
import {
    OK
} from 'constants/api'
import {
    get
} from 'actions/user'

const DetailRoute = store => ({
    path: 'detail/:id',
    onEnter(nextState, replace) {
        store.dispatch(getOrganizeIfNeeded({
            oid: nextState.params.id
        })).then(() => {
            const detail = store.getState().organize.detail
            if (detail === null) {
                replace({
                    pathname: '/home'
                })
                throw new Error(`获取机构详情失败:${store.getState().organize.errorMessage}`)
            } else {
                const user = store.getState().auth.user
                get({
                    key: user.id,
                    token: user.token,
                    uid: detail.uid
                }).then(data => {
                    if (data.code === OK && data.get.uid > 0) {
                        store.dispatch(getSuccess(Object.assign({},
                            detail, {
                                admin: `${data.get.cname}(${data.get.mobile})`
                            }
                        )))
                    }
                })
            }
        }).catch(error => {
            store.dispatch(addErrorMessage(error.message))
        })
    },
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(null, require('containers/pages/organize/detailContainer').default)
        }, 'detailOrganize')
    }
})

export default DetailRoute