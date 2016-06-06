module.exports = {
    path:'add',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            cb(null,require('containers/pages/organize/addContainer.js').default)
        },'addOrganize')
    }
}