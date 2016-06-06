const organizeRoute = store => ({
    path: 'organize',
    childRoutes: [
        require('./add'),
        require('./list').default(store)
    ]
})

export default organizeRoute