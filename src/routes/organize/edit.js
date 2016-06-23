import {
    initialize
} from 'redux-form'
import { getOrganizeIfNeeded } from 'actions/organize'

const EditRoute = store => ({
    path: 'edit/:id',
    onEnter(nextState, replace) {
        Promise.resolve(store.dispatch(getOrganizeIfNeeded({
            oid:nextState.params.id
        }))).then(() => {
            const organize = store.getState().organize.detail
            if(organize === null){
                replace({
                    pathname: '/home'
                })
            }else{
                store.dispatch(initialize('editOrganize',organize))
            }
        })
    },
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(null, require('containers/pages/organize/editContainer').default)
        }, 'editOrganize')
    }
})

export default EditRoute