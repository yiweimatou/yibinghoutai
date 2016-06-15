import {
    fetchList,fetchInfo
} from 'actions/organize'

const ListRoute = store => ({
    path: 'list',
    onEnter() {
        const organize = store.getState().organize
        store.dispatch(fetchInfo())
        store.dispatch(fetchList({
            limit: organize.limit
        }))
    },
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('containers/pages/organize/listContainer').default)
        }, 'listOrganize')
    }
})

export default ListRoute