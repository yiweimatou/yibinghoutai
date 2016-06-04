import React from 'react'
import Formsy from 'formsy-react'
import {
    FormsyText,
    FormsySelect
} from 'formsy-material-ui/lib'
import {
    MenuItem,
    RaisedButton,
    TextField,
    Dialog,
    CircularProgress
} from 'material-ui'
import {ORGANIZE_STATE,CODE} from 'constants/enumerate'
import {uploadCover} from 'utils/upload'
import {getKey,getToken} from 'utils/helper'
import Organize from 'models/Organize'

const styles = {
    form:{
        display:'flex',
        flexFlow:'column wrap',
        alignItems:'center'
    },
    text:{
        width:'80%'
    },
    margin:{
        marginLeft:20
    },
    div:{
        display:'flex',
        width:'80%'
    },
    submit:{
        display:'flex',
        width:'80%',
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
class Edit extends React.Component {
    static propsTypes = {
        organize:React.PropTypes.object.isRequired
    }
    state = {
        canSubmit:false,
        canLogoUpload:false
    }
    submitForm = (data)=>{
        let self = this
        Organize.edit(Object.assign({},data,{
            key:getKey(),
            token:getToken(),
            oid:this.props.organize.oid
        })).then(data=>{
            data.code === CODE.NORMAL?Notice('更新成功!'):Notice(data.msg)
        })
    }
    handleFileChange = (e)=>{
        document.querySelector('#logoPath').value = e.target.value
        this.setState({
            canLogoUpload:true
        })    
    }
    handleChooseFileClick = ()=>{
        setTimeout(() => {
            document.querySelector('#logoFile').click()
        }, 200)
    }
    handleUpload(){
        let self = this
        const input = document.querySelector('#logoFile')       
        let formData = new FormData()
        formData.append('uploadfile',input.files[0])
        uploadCover(formData).then(res=>{
            if(res.code === CODE.NORMAL){
                Notice('图片上传成功!')
                self.refs['logo'].setState({
                    value:res.data.url
                })
               
            }else{
                Notice(res.msg)
            }
        })
    }
    enableButton=()=>{
        this.setState({
            canSubmit:true
        })
    }
    disableButton=()=>{
        this.setState({
            canSubmit:false
        })
    }
    render(){
        let organize = this.props.organize
        return (
            <div>
                <Formsy.Form
                    style = {styles.form}
                    onValidSubmit = {this.submitForm}
                    onInvalidSubmit = {Notice}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
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
                        multiLine = {true}
                        rows = {2}
                    />
                    <div style={styles.div}>
                        <div>
                            <input
                                type="file" id = 'logoFile' style ={styles.input} 
                                onChange={this.handleFileChange}
                            />
                            <label>
                                <RaisedButton label="选择logo文件" onTouchTap={this.handleChooseFileClick}/>
                            </label>
                            <TextField
                                style={styles.url}
                                id = 'logoPath'
                            />
                            <RaisedButton 
                                style={styles.url} 
                                label = '上传LOGO'
                                onTouchTap ={this.handleUpload}
                                secondary={true}
                                disabled = {!this.state.canLogoUpload}
                            />
                        </div>                      
                    </div>
                    <FormsyText
                            style = {styles.text}
                            ref = 'logo'
                            name = 'logo'
                            value = {organize.logo}
                            hintText = '请输入机构logo'
                            validationError = '请输入有效的URL地址'
                            validations="isUrl"
                            required
                            floatingLabelText = '机构logo'
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
                    <div style = {styles.submit}>
                        <RaisedButton
                            label = '取消'
                            onTouchTap = {this.props.close}
                        />
                        <RaisedButton
                            style = {styles.margin}
                            type = 'submit'
                            label = '确定提交'
                            primary = {true}
                            disabled = {!this.state.canSubmit}
                        />
                    </div>
                </Formsy.Form>
         </div>   
        )
    }
}

export default Edit