import { reduxForm } from 'redux-form'
import { addUser } from 'actions/user'
import AddView from 'components/pages/user/AddView'
import { isMobile } from 'utils/validation'
import { addErrorMessage } from 'actions/error'
// import { connect } from 'react-redux'

const validate = values => {
    const errors = {}
    if (!values.pwd) {
        errors.pwd = '请填写密码'
    }
    if (!values.mobile) {
        errors.mobile = '请填写手机号码'
    } else if (!isMobile(values.mobile)) {
        errors.mobile = '请填写正确的手机号码'
    }
    return errors
}
const onSubmit = (values, dispatch) => {
    return new Promise((resolve,reject) => {
        dispatch(addUser(values)).then(result => {
            if(result.ok){
                resolve(dispatch(addErrorMessage('新建成功')))
            }else{
                return reject(dispatch(addErrorMessage(result.msg)))
            }
        })
    })
}

export default reduxForm({
    form:'addUser',
    validate,
    onSubmit
})(AddView) 