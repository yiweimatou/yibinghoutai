module.exports = {
    path:'add',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            cb(null,require('../../components/pages/organize/Add.js'))
        })
    }
}