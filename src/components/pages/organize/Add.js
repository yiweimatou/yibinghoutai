import React from 'react'
import Formsy from 'formsy-react'
import {
    FormsyText,
    FormsySelect
} from 'formsy-material-ui/lib'
import {
    MenuItem,
    RaisedButton,
    TextField
} from 'material-ui'
import {ORGANIZE_STATE} from 'constants/enumerate'

const styles = {
    form:{
        display:'flex',
        flexFlow:'column wrap',
        alignItems:'center'
    },
    text:{
        width:'70%'
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
        justifyContent:'flex-end',
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
    state = {
        canSubmit:false
    }
    submitForm = (data)=>{
        
    }
    handleFileChange = ()=>{
        
    }
    handleChooseFileClick = ()=>{
        setTimeout(() => {
            this.refs.logoFile.click();
        }, 200);
    }
    render(){
        return (
                <Formsy.Form
                    style = {styles.form}
                    onValidSubmit = {this.submitForm}
                    onInvalidSubmit = {Notice}
                >
                    <FormsyText
                        style={styles.text}
                        name = 'oname'
                        validationError = '请输入机构名称'
                        required
                        hintText = '请输入机构名称'
                        floatingLabelText = '机构名称'
                    />
                    <FormsyText
                        style = {styles.text}
                        name = 'descript'
                        hintText = '请输入机构简介'
                        floatingLabelText = '机构简介'
                    />
                    <div style={styles.div}>
                        <div>
                            <input
                                type="file" ref = 'logoFile' style ={styles.input} 
                                onChange={this.handleFileChange.bind(this)}
                            />
                            <label htmlFor="file">
                                <RaisedButton label="选择logo文件" onTouchTap={this.handleChooseFileClick}/>
                            </label>
                            <RaisedButton style={{marginLeft:20}} label = '上传LOGO' secondary={true}/>
                        </div>
                        <FormsyText
                            style = {styles.url}
                            name = 'logo'
                            ref = 'logoUrl'
                            hintText = '请输入机构logo'
                            validationError = '请输入有效的URL地址'
                            validations="isUrl"
                            required
                            floatingLabelText = '机构logo'
                        />
                    </div>
                    <FormsySelect
                        style = {styles.text}
                        name = 'state'
                        value = {ORGANIZE_STATE.NORMAL}
                        floatingLabelText = '选择机构状态'
                    >
                        <MenuItem value = {ORGANIZE_STATE.NORMAL} primaryText="正常"/>
                        <MenuItem value = {ORGANIZE_STATE.FREEZE} primaryText="冻结"/>
                        <MenuItem value = {ORGANIZE_STATE.FOREVER_FREEZE} primaryText="永久冻结"/>
                    </FormsySelect>
                    <div style = {styles.submit}>
                        <RaisedButton
                            type = 'submit'
                            label = '确定提交'
                            primary = {true}
                            disable = {!this.state.canSubmit}
                        />
                    </div>
                </Formsy.Form>
        )
    }
}

module.exports = Add