module.exports = {
    path : 'organize',
    getChildRoutes(location,cb){
        require.ensure([],(require) => {
            cb(null,[
                require('./add'),
                require('./list')
            ])
        })
    }
}