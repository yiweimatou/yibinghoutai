import {
    fetchListIfNeeded
} from 'actions/organize'
import {
    injectReducer
} from '../../store/reducers.js'

const ListRoute = store => ({
    path: 'list',
    onEnter() {
        if (store.asyncReducers['organize'] === undefined) {
            const reducer = require('reducers/organize').default
            injectReducer(store, {
                key: 'organize',
                reducer
            })
        }
        const organize = store.getState().organize
        store.dispatch(fetchListIfNeeded({
            limit: organize.limit,
            offset: organize.offset
        }))
    },
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('containers/pages/organize/listContainer').default)
        }, 'listOrganize')
    }
})

export default ListRoute