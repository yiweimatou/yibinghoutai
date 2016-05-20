import React from 'react'
import {withRouter} from 'react-router'
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
import Admin from '../../models/Admin.js'
import {
	CODE
} from '../../constants/enumerate.js'

class Login extends React.Component {
	constructor(...args){
		super(...args)
		this.state ={
			canSubmit:false,
			autoHideDuration:3000,
			message:'',
			open:false
		}
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
	      display:'inline-block'
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
		accountError : '请输入用户名',
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
	submitForm = async (data)=>{
		const result = await Admin.login(data.account,data.pwd)
		if(result.code === CODE.NORMAL){
			if(data.remember){
				localStorage.setItem('id',result.data.key)
				localStorage.setItem('token',result.data.token)
			}else{
				sessionStorage.setItem('id',result,data.key)
				sessionStorage.setItem('token',result.data.token)
			}
			const {location} = this.props
			if(location.state && location.state.nextPathname){
				this.props.router.replace(location.state.nextPathname)
			}else{
				this.props.router.replace('/')
			}	
		}else{
			this.notifyFormError(result.msg)
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
		const {accountError,pwdError} = this.errorMessage
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
		        					name='account'
		        					validationError = { accountError }
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
		        					label = '记住免登录'
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

module.exports = withRouter(Login)