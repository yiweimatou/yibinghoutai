import React from 'react'
import Formsy from 'formsy-react'
import {cyan500} from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'
import { 
	FormsyCheckbox, 
	// FormsyDate, 
	// FormsyRadio, 
	// FormsyRadioGroup,
    // FormsySelect, 
    FormsyText, 
    // FormsyTime, 
    FormsyToggle 
} from 'formsy-material-ui/lib'
import {MuiThemeProvider,getMuiTheme} from 'material-ui/styles'

class Login extends React.Component {
	constructor(){
		super(...arguments)
		this.state ={
			canSubmit:false,
			autoHideDuration:3000,
			message:'',
			open:false
		}
	}
	static contextTypes = {
		router:React.PropTypes.object
	}
	styles = {
		paperStyle:{
			maxWidth : '500px',
        	margin : '10em auto',
        	padding: '3em 2em 2em 2em',
        	textAlign: 'center',
		},
		switchStyle: {
	      margin: '0 auto',
	      width:'50%',
	      display:'inline-block',
          // lineHeight:72,
	    },
		submitStyle : {
			marginTop: 32,
			width:256
		},
		titleStyle:{
			color :cyan500
		}
	}
	errorMessage = {
		usernameError : '请输入用户名',
		pwdError:'请输入密码'
	}
	enableButton = ()=>{
		this.setState({
			canSubmit : true
		})
	}
	disableButton = ()=>{
		this.setState({
			canSubmit : false
		})
	}
	submitForm = (data)=>{
		this.setState({
			open:true,
			message:JSON.stringify(data,null,4)
		})
		if(this.props.state && this.props.state.nextPathname){
			this.context.router.push(this.props.state.nextPathname)
		}else{
			this.context.router.push('/')
		}
	}
	notifyFormError = (error)=>{
		this.setState({
			open:true,
			message:`出错了:${error}`
		})
	}
	closeSnackbar = () => {
		this.setState({
			open:false
		})
	}
	handleActionTouchTap = () =>{
		this.closeSnackbar()
	}
	handleRequestClose = ()=>{
		this.closeSnackbar()
	}
	render(){
		const {usernameError,pwdError} = this.errorMessage
		return (
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<div>
		        		<Paper style={this.styles.paperStyle}>
		        			<h1 style={this.styles.titleStyle}>后台登录</h1>
		        			<Formsy.Form
		        				onValid={this.enableButton}
		            			onInvalid={this.disableButton}
		            			onValidSubmit={this.submitForm}
		            			onInvalidSubmit={this.notifyFormError}
		        			>
		        				<FormsyText
		        					name='username'
		        					validationError = { usernameError }
		        					required
		        					hintText = '请输入用户名'
		        					floatingLabelText="用户名"
		        				/>
		        				<FormsyText
		        					name = 'pwd'
		        					type = 'password'
		        					validationError = { pwdError }
		        					required
		        					hintText = '请输入密码'
		        					floatingLabelText = '密码'
		        				/>
		        				<FormsyCheckbox
		        					name='remember'
		        					label = '记住密码'
		        					style = {this.styles.switchStyle}
		        				/>
		        				<RaisedButton
					              style={this.styles.submitStyle}
					              primary
					              type="submit"
					              label="登录"
					              disabled={!this.state.canSubmit}
		           			    />
		        			</Formsy.Form>
		        		</Paper>
		        		<Snackbar
				          open={this.state.open}
				          message={this.state.message}
				          action="知道了"
				          autoHideDuration={this.state.autoHideDuration}
				          onActionTouchTap={this.handleActionTouchTap}
				          onRequestClose={this.handleRequestClose}
				        />
			        </div>
			    </MuiThemeProvider>
		)
	}
}

export default Login