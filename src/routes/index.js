import React from 'react'
import App from '../components/App.js'
import Admin from '../models/Admin.js'

const requireAuth = (nextState, replace) => {
	if (!Admin.loggedIn()) {
		replace({
			pathname: '/login',
			state: {
				nextPathname: nextState.location.pathname
			}
		})
	}
}
const Routes = {
	component: 'div',
	childRoutes: [
		require('./login.js'), {
			path: '/',
			component: App,
			indexRoute: require('./home.js'),
			onEnter: requireAuth,
			childRoutes: [
				require('./organize/index.js'), {
					path: '*',
					component: require('../components/pages/PageNotFound.js')
				}
			]
		}
	]
}

export default Routes