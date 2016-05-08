import React from 'react'
import Formsy from 'formsy-react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { 
	FormsyCheckbox, 
	FormsyDate, 
	FormsyRadio, 
	FormsyRadioGroup,
    FormsySelect, 
    FormsyText, 
    FormsyTime, 
    FormsyToggle 
} from 'formsy-material-ui/lib'

class login extends React.Component {
	constructor(){
		this.state ={
			canSubmit:false
		}
	}
	styles = {
		paperStyle:{

		}
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
	submitForm = ()=>{

	}
	notifyFormError = ()=>{

	}
	render(){
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
        		<Paper style={this.styles.paperStyle}>
        			<Formsy.Form
        				onValid={this.enableButton}
            			onInvalid={this.disableButton}
            			onValidSubmit={this.submitForm}
            			onInvalidSubmit={this.notifyFormError}
        			>

        			</Formsy.Form>
        		</Paper>
        	</MuiThemeProvider>
		)
	}
}

export default login