import React from 'react'
import {
	getMuiTheme,
	MuiThemeProvider,
	spacing
} from 'material-ui/styles'
import AppNavDrawer from './AppNavDrawer'
import {Dialog,RaisedButton,AppBar,Snackbar,Paper} from 'material-ui'
import {pink400} from 'material-ui/styles/colors'

class App extends React.Component {
	constructor(){
		super(...arguments)
		this.state = {
			open:false,
			message:'',
			noticeOpen:false,
			notice:''
		}
		if(window.Alert === undefined){
			window.Alert = this.alert.bind(this)
		}		
		if(window.Notice === undefined){
			window.Notice = this.notice.bind(this)
		}
	}	
	static propTypes = {
		children:React.PropTypes.node
	}
	alert(message){
		this.setState({
			open:true,
			message:message
		})
	}
	notice(message){
		this.setState({
			noticeOpen:true,
			notice:message
		})
	}
	handleClose = () =>{
        this.setState({
            open:false
        })
    }
	styles = {
		avatarStyle:{
			margin:5
		},
		appBar:{
			position:'fixed',
			top:0
		},
		contentStyle: {
	        // margin: spacing.desktopGutter,
	        marginLeft : 300,
			paddingTop:getMuiTheme().appBar.height
	    },
		paper:{
			margin:20,
			padding:20
		}
	}
	handleRequestClose = ()=>{
		this.closeSnackbar()
	}
	render(){
		const actions = [
            <RaisedButton
                label="确定"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ]
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>			
					<AppBar 
						title = '管理后台'
						showMenuIconButton = {false}
						style={this.styles.appBar}
						// iconElementRight = {avatar}
					/>
					<AppNavDrawer
						location = {this.props.location}
					 />
					<div style = {this.styles.contentStyle}>
						<Paper style = {this.styles.paper}>
							{this.props.children}
						</Paper>
					</div>
					<Dialog
						actions={actions}
						modal={false}
						open={this.state.open}
						onRequestClose={this.handleClose}
					>
						{this.state.message}
					</Dialog>
					<Snackbar
				          open={this.state.noticeOpen}
				          message={this.state.notice}
				          action="知道了"
				          autoHideDuration={3000}
				          onActionTouchTap={this.handleRequestClose}
				          onRequestClose={this.handleRequestClose}
				     />
				</div>
			</MuiThemeProvider>
			)
	}
}

export default App
