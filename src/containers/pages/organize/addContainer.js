import { reduxForm } from 'redux-form'
import { OK } from 'constants/api'
import Add from 'components/pages/organize/Add'
import { isMobile,isUrl } from 'utils/validation'
import { addErrorMessage } from 'actions/error'
import { add } from 'actions/organize'
import { get as getUser,add as addUser } from 'actions/user'
import { connect } from 'react-redux'

const validate = values => {
    const errors = {}
    if (!values.oname) {
        errors.oname = '请填写机构名称'
    }
    if (!values.state) {
        errors.state = '请选择机构状态'
    }
    if (!values.logo) {
        errors.logo = '请填写logo'
    } else if (!isUrl(values.logo)) {
        errors.logo = '请填写正确的url地址'
    }
    if (!values.mobile) {
        errors.mobile = '请填写管理员手机号码'
    } else if (!isMobile(values.mobile)) {
        errors.mobile = '请填写正确的手机号码'
    }
    return errors
}

const mapStateToProps = (state)=>{
    return {
        key:state.auth.user.id,
        token:state.auth.user.token
    }
}
const mergeProps = (state) => {
    return {
        onSubmit: (values,dispatch) => {
            return new Promise((resolve, reject) => {
                getUser({ 
                    key:state.key,
                    token:state.token,
                    mobile:values.mobile
                }).then(data => {
                    if(data.code === OK){
                        if(data.get.uid > 0){
                            return data.get.uid
                        }else{
                            return addUser({
                                key:state.key,
                                token:state.token,
                                mobile:values.mobile,
                                pwd:values.mobile
                            }).then(data => {
                                if(data.identity > 0){
                                    return data.identity
                                }else{
                                   throw new Error(`新建用户失败:${data.msg}`)
                                }
                            })
                        }
                    }else{
                        throw new Error(`获取用户失败:${data.msg}`)
                    }
                }).then( uid =>{
                    if(uid > 0){
                        values.uid = uid
                        return add(state.key,state.token,values)
                    }else{
                        return reject(dispatch(addErrorMessage('获取用户信息失败!')))
                    }
                }).then(data => {
                        if (data.code === OK) {
                            resolve(dispatch(addErrorMessage('新建成功!')))
                        } else {
                            return reject(dispatch(addErrorMessage(`新增失败:${data.msg}`)))
                        }
                }).catch(error => {
                    return reject(dispatch(addErrorMessage(error.message)))
                })
            })
        }
    }
}

export default connect(mapStateToProps, null,mergeProps)(reduxForm({
    form: 'addOrganize',
    validate
})(Add))