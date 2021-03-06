import {
    injectReducer
} from '../../store/reducers.js'

const organizeRoute = store => ({
    path: 'organize',
    onEnter() {
        if (store.asyncReducers['organize'] === undefined) {
            const reducer = require('reducers/organize').default
            injectReducer(store, {
                key: 'organize',
                reducer
            })
        }
    },
    childRoutes: [
        require('./add'),
        require('./list').default(store),
        require('./edit').default(store),
        require('./detail').default(store)
    ]
})

export default organizeRoute