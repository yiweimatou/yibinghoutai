import React from 'react'
import { Field } from 'redux-form'
import { RaisedButton,MenuItem } from 'material-ui'
import TextField from '../../ReduxForm/TextField'
import SelectField from '../../ReduxForm/SelectField'

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
    }
}

class EditView extends React.Component {
    render() {
        const {
            handleSubmit,submitting,invalid
        } = this.props
        return (
            <form onSubmit = { handleSubmit } style = { styles.form }>
                <Field name = 'cname'
                    hintText = '姓名'
                    floatingLabelText = '姓名'
                    component = { TextField }
                    style = { styles.item }
                />
                <Field name = 'mobile'
                    hintText = '手机号码'
                    floatingLabelText = '手机号码'
                    component = { TextField }
                    style = { styles.item }
                />
                <Field name = 'lesson'
                    component = { SelectField }
                    style = { styles.item }
                    hintText = '课程权限'
                    floatingLabelText = '课程权限'
                >
                    <MenuItem value={ 1 } primaryText="无"/>
                    <MenuItem value={ 2 } primaryText="有"/>
                </Field>
                <Field name = 'lessons'
                    component = { SelectField }
                    style = { styles.item }
                    hintText = '授权课程权限'
                    floatingLabelText = '授权课程权限'
                >
                    <MenuItem value={ 1 } primaryText="无"/>
                    <MenuItem value={ 2 } primaryText="有"/>
                </Field>
                <Field name = 'state'
                    component = { SelectField }
                    style = { styles.item }
                    hintText = '用户状态'
                    floatingLabelText = '用户状态'
                >
                    <MenuItem value={ 1 } primaryText="正常"/>
                    <MenuItem value={ 2 } primaryText="冻结"/>
                    <MenuItem value={ 3 } primaryText="永久冻结"/>
                </Field>
                <div style = {styles.submit}>
                    <RaisedButton
                        type = 'submit'
                        label = '确认'
                        primary = { true }
                        disabled = { submitting||invalid }
                    />
                </div>
            </form>
        )
    }
}

EditView.propTypes = {
    handleSubmit : React.PropTypes.func.isRequired,
    submitting : React.PropTypes.bool.isRequired,
    invalid : React.PropTypes.bool.isRequired
}

export default EditView