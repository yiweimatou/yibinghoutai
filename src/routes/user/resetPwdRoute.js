const setPwdRoute = () => ({
	path:'resetpwd',
	getComponent(nextState,cb){
		require.ensure([],require=>{
			cb(null,require('containers/pages/user/resetPwdContainer').default)
		},'resetpwd')
	}
})

export default setPwdRoute

