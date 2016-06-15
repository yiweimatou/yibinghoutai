import {
    reduxForm
} from 'redux-form'
import EditView from 'pages/user/EditView'
import {
    isMobile
} from 'utils/validation'
import {
    addErrorMessage
} from 'actions/error'
import {
    edit
} from 'actions/user'

const validate = values => {
    const errors = {}
    if (!values.mobile) {
        errors.mobile = '请填写手机号码'
    } else if (!isMobile(values.mobile)) {
        errors.mobile = '请填写正确的手机号码'
    }
}

const onSubmit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(edit(values)).then(data => {
            if (data.ok) {
                resolve(dispatch(addErrorMessage('编辑成功！')))
            } else {
                return reject(dispatch(addErrorMessage(`编辑失败:${data.msg}`)))
            }
        }).catch(error => {
            return reject(dispatch(addErrorMessage(error.message)))
        })
    })
}

export default reduxForm({
    form: 'editUser',
    validate,
    onSubmit
})(EditView)