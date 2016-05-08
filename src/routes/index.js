import React from 'react'
import {
	Route,
	Redirect,
	IndexRoute
} from 'react-router'
import Home from '../components/pages/home'

const Routes = (
	<Route path = '/'>
		<IndexRoute component={ Home }/>
	</Route>
)

export default Routes