import {
    initialize
} from 'redux-form'
import { getOrganizeIfNeeded } from 'actions/organize'
import {
    addErrorMessage
} from 'actions/error'

const EditRoute = store => ({
    path: 'edit/:id',
    onEnter(nextState, replace) {
        store.dispatch(getOrganizeIfNeeded({
            oid:nextState.params.id
        })).then(() => {
            const organize = store.getState().organize.detail
            if(organize === null){
                replace({
                    pathname: '/home'
                })
                throw new Error(`获取机构详情失败:${store.getState().organize.errorMessage}`)
            }else{
                store.dispatch(initialize('editOrganize',organize))
            }
        }).catch(error => {
            store.dispatch(addErrorMessage(error.message))
        })
    },
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(null, require('containers/pages/organize/editContainer').default)
        }, 'editOrganize')
    }
})

export default EditRoute