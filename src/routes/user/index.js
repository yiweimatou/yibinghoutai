const userRoute = store => ({
    path:'user',
    childRoutes:[
        require('./add').default,
        require('./list').default(store),
        require('./edit').default(store)
    ]
})

export default userRoute