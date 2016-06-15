import {
    reduxForm
} from 'redux-form'
import EditView from 'components/pages/organize/EditView'
import {
    isUrl
} from 'utils/validation'
import {
    addErrorMessage
} from 'actions/error'
import {
    edit
} from 'actions/organize'

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
    return errors
}

const onSubmit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
        edit(values)
            .then(data => {
                if (data.ok) {
                    resolve(dispatch(addErrorMessage('编辑成功!')))
                } else {
                    return reject(dispatch(addErrorMessage(`编辑失败:${data.msg}`)))
                }
            }).catch(error => {
                return reject(dispatch(addErrorMessage(error.message)))
            })
    })
}

export default reduxForm({
    form: 'editOrganize',
    validate,
    onSubmit
})(EditView)