import {
    injectReducer
} from 'store/reducers'
import { fetchUserList,fetchInfo } from 'actions/user'

const listRoute = store => ({
    path: 'list',
    onEnter() {
        if (store.asyncReducers['user'] === undefined) {
            const reducer = require('reducers/user').default
            injectReducer(store, {
                key: 'user',
                reducer
            })
        }
        const user = store.getState().user
        store.dispatch(fetchInfo())
        store.dispatch(fetchUserList({
            limit:user.limit
        }))
    },
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(null, require('containers/pages/user/listContainer').default)
        }, 'listUser')
    }
})

export default listRoute