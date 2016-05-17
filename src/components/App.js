import React from 'react'
import {
	getMuiTheme,
	MuiThemeProvider,
	spacing
} from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import AppNavDrawer from './AppNavDrawer'
import AppBar from 'material-ui/AppBar'
import {pink400} from 'material-ui/styles/colors'

class App extends React.Component {
	static propTypes = {
		children:React.PropTypes.node
	}
	styles = {
		avatarStyle:{
			margin:5
		},
		contentStyle: {
	        // margin: spacing.desktopGutter,
	        marginLeft : 300
	     }
	}
	render(){
		const avatar = (
			<div>
				<span>ruofan</span>
				<Avatar
					icon = {<i className='fa fa-user' />}
					style = { this.styles.avatarStyle }
					backgroundColor = {pink400}
					size = {40}
				/>
            </div>
			)
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>			
					<AppBar 
						title = '管理后台'
						showMenuIconButton = {false}
						iconElementRight = {avatar}
					/>
					<AppNavDrawer
						location = {this.props.location}
					 />
					<div style = {this.styles.contentStyle}>
						{this.props.children}
					</div>
				</div>
			</MuiThemeProvider>
			)
	}
}

export default App
