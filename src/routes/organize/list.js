module.exports = {
    path:'list',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            cb(null,require('pages/organize/List'))
        })
    }
}