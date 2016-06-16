import { reduxForm } from 'redux-form'
import { edit,get } from 'actions/user'
import ResetPwdView from 'components/pages/user/ResetPwdView'
import { isMobile } from 'utils/validation'
import { toastr } from 'react-redux-toastr'

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
    return new Promise((resolve) => {
        dispatch(get({
            mobile: values.mobile
        })).then(data => {
            if (data.code === 200 && data.get.uid > 0) {
                resolve(dispatch(edit({
                    mobile: values.mobile,
                    uid: data.get.uid,
                    pwd: values.pwd
                })))
            } else {
                toastr.error(data.msg || '用户不存在')
            }
        })
    })
}

export default reduxForm({
    form:'resetPwd',
    validate,
    onSubmit
})(ResetPwdView) 