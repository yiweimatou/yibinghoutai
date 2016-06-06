import React from 'react'
import { Field } from 'redux-form'
import { RaisedButton, MenuItem } from 'material-ui'
import TextField from '../../ReduxForm/TextField'
import SelectField from '../../ReduxForm/SelectField'

const styles = {
    form:{
        display:'flex',
        flexFlow:'column wrap',
        alignItems:'center'
    },
    item:{
        width:'70%'
    },
    margin:{
        marginLeft:20
    },
    div:{
        display:'flex',
        alignItems:'flex-end',
        width:'70%'
    },
    submit:{
        display:'flex',
        width:'70%',
        flexFlow:'row wrap',
        // justifyContent:'flex-end',
        marginTop:30
    },
    url:{
        marginLeft:20,
        flex:1
    },
    input:{
        width :0.1,
        height :0.1,
        opacity :0,
        overflow :'hidden',
        position :'absolute',
        zIndex :-1
    }
}
class Add extends React.Component {
    render(){
        const {
            handleSubmit,submitting,invalid,reset
        } = this.props
        return (
            <form onSubmit = { handleSubmit } style = { styles.form}>
                <Field name = 'oname' 
                    type = 'text'
                    hintText = '机构名称'
                    floatingLabelText = '机构名称'
                    component = {TextField}
                    style = { styles.item }
                />
                <Field name = 'mobile' 
                    type = 'text'
                    hintText = '管理员手机号码'
                    floatingLabelText = '管理员手机号码'
                    component = {TextField}
                    style = { styles.item }
                />
                <Field name = 'logo' 
                    type = 'text'
                    hintText = 'logoURL地址'
                    floatingLabelText = 'logoURL地址'
                    component = {TextField}
                    style = { styles.item }
                />
                <Field name = 'state'
                    component = { SelectField }
                    style = { styles.item }
                    value = { 1 }
                    hintText = '机构状态'
                    floatingLabelText = '机构状态'
                >
                    <MenuItem value="1" primaryText="正常"/>
                    <MenuItem value="2" primaryText="冻结"/>
                    <MenuItem value="3" primaryText="永久冻结"/>
                </Field>
                <Field name = 'descript'
                    hintText = '机构简介'
                    floatingLabelText = '机构简介'
                    component = { TextField }
                    multiLine = { true }
                    rows = { 2 }
                    style = { styles.item }
                />
                <div style = {styles.submit}>
                    <RaisedButton
                        type = 'submit'
                        label = '提交'
                        primary = { true }
                        disabled = { submitting||invalid }
                    />
                    <RaisedButton
                        label = '取消'
                        onClick = { reset }
                        style = { styles.margin }
                    />
                </div>
            </form>
        )
    }
}

Add.propTypes = {
    handleSubmit:React.PropTypes.func.isRequired,
    submitting:React.PropTypes.bool.isRequired,
    reset:React.PropTypes.func.isRequired,
    invalid:React.PropTypes.bool.isRequired,
    error:React.PropTypes.string
}

export default Add