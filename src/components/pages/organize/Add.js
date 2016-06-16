import React from 'react'
import { Field } from 'redux-form'
import { RaisedButton, MenuItem } from 'material-ui'
import TextField from '../../ReduxForm/TextField'
import SelectField from '../../ReduxForm/SelectField'
import ImageUpload from '../../ImageUpload'

const styles = {
    form:{
        display:'flex',
        flexFlow:'column wrap',
        alignItems:'center'
    },
    item:{
        width:'80%'
    },
    margin:{
        marginLeft:20
    },
    div:{
        display:'flex',
        alignItems:'flex-end',
        width:'80%'
    },
    submit:{
        display:'flex',
        width:'80%',
        flexFlow:'row wrap',
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
            handleSubmit,submitting,invalid,reset,onChange
        } = this.props
        return (
            <form onSubmit = { handleSubmit } style = { styles.form}>
                <ImageUpload onChange = { onChange }/>
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
                <Field name = 'state'
                    component = { SelectField }
                    style = { styles.item }
                    hintText = '机构状态'
                    floatingLabelText = '机构状态'
                >
                    <MenuItem value={1} primaryText="正常"/>
                    <MenuItem value={2} primaryText="冻结"/>
                    <MenuItem value={3} primaryText="永久冻结"/>
                </Field>
                <Field name = 'category'
                    component = { SelectField }
                    style = { styles.item }
                    hintText = '机构类型'
                    floatingLabelText = '机构类型'
                >
                    <MenuItem value={1} primaryText="官方"/>
                    <MenuItem value={2} primaryText="医院"/>
                    <MenuItem value={3} primaryText="药企"/>
                    <MenuItem value={4} primaryText='学校'/>
                    <MenuItem value={5} primaryText='其他'/>
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
    onChange:React.PropTypes.func.isRequired
}

export default Add