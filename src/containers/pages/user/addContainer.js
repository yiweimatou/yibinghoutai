import { reduxForm } from 'redux-form'
import { addUser } from 'actions/user'
import AddView from 'components/pages/user/AddView'
import { isMobile } from 'utils/validation'

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
        resolve(dispatch(addUser(values)))
    })
}

export default reduxForm({
    form:'addUser',
    validate,
    onSubmit
})(AddView) 