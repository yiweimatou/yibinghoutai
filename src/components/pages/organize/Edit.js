import React from 'react'
import Formsy from 'formsy-react'
import {
    FormsyText,
    FormsySelect
} from 'formsy-material-ui/lib'
import {
    MenuItem
} from 'material-ui'
import {ORGANIZE_STATE} from 'constants/enumerate'

const styles = {
    form:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    text:{
        width:'70%'
    }
}
class Edit extends React.Component {
    static propsTypes = {
        organize:React.PropTypes.object.isRequired
    }
    render(){
        let organize = this.props.organize
        return (
            <Formsy.Form
                style = {styles.form}
                onValidSubmit = {this.submitForm}
                onInvalidSubmit = {Notice}
            >
                <FormsyText
                    style={styles.text}
                    name = 'oname'
                    value = {organize.oname}
                    validationError = '请输入机构名称'
                    required
                    hintText = '请输入机构名称'
                    floatingLabelText = '机构名称'
                />
                <FormsyText
                    style = {styles.text}
                    name = 'descript'
                    value = {organize.descript}
                    hintText = '请输入机构简介'
                    floatingLabelText = '机构简介'
                />
                <FormsySelect
                    style = {styles.text}
                    name = 'state'
                    value = {organize.state}
                    floatingLabelText = '选择机构状态'
                >
                    <MenuItem value = {ORGANIZE_STATE.NORMAL} primaryText="正常"/>
                    <MenuItem value = {ORGANIZE_STATE.FREEZE} primaryText="冻结"/>
                    <MenuItem value = {ORGANIZE_STATE.FOREVER_FREEZE} primaryText="永久冻结"/>
                </FormsySelect>
                
            </Formsy.Form>
        )
    }
}

export default Edit