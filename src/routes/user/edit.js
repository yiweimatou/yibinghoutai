import {
    initialize
} from 'redux-form'
import {
    getUserIfNeeded
} from 'actions/user'
import {
    injectReducer
} from 'store/reducers'
import { toastr } from 'react-redux-toastr'

const editRoute = store => ({
    path: 'edit/:id',
    onEnter(nextState, replace) {
        if (store.asyncReducers['user'] === undefined) {
            const reducer = require('reducers/user').default
            injectReducer(store, {
                key: 'user',
                reducer
            })
        }
        store.dispatch(getUserIfNeeded({
            uid: nextState.params.id
        })).then(() => {
            const user = store.getState().user.detail
            if (user === null) {
                replace({
                    pathname: '/home'
                })
                throw new Error('获取用户失败')
            } else {
                store.dispatch(initialize('editUser', user))
            }
        }).catch(error => {
            toastr.error(error.message)
        })
    },
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(null, require('containers/pages/user/editContainer').default)
        }, 'editUser')
    }
})

export default editRoute