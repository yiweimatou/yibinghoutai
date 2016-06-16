import {
    reduxForm
} from 'redux-form'
import EditView from 'pages/user/EditView'
import {
    isMobile
} from 'utils/validation'
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
    return new Promise((resolve) => {
        const user =  {
            mobile : values.mobile,
            cname:values.cname,
            uid:values.uid,
            state:values.state,
            lesson:values.lesson,
            lessons:values.lessons
        }
        resolve(dispatch(edit(user)))
    })
}

export default reduxForm({
    form: 'editUser',
    validate,
    onSubmit
})(EditView)