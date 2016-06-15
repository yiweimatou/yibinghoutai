const addRoute = ({
    path: 'add',
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(null, require('containers/pages/user/addContainer').default)
        }, 'addUser')
    }
})

export default addRoute