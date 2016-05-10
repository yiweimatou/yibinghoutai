import React from 'react'
import {
	Route,
	Redirect,
	IndexRoute
} from 'react-router'
import App from '../components/App'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'

const Routes = (
	<div>
		<Route path = '/' component = { App }>
			<IndexRoute component={ Home }/>
		</Route>
		<Route path='/login' component = { Login } />
	</div>
)

export default Routes