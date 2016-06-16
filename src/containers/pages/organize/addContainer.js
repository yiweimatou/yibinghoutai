import { reduxForm,change } from 'redux-form'
import { OK } from 'constants/api'
import Add from 'components/pages/organize/Add'
import { isMobile } from 'utils/validation'
import { add } from 'actions/organize'
import { get as getUser,add as addUser } from 'actions/user'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { uploadLogo } from 'actions/upload'

const validate = values => {
    const errors = {}
    if (!values.oname) {
        errors.oname = '请填写机构名称'
    }
    if (!values.state) {
        errors.state = '请选择机构状态'
    }
    if (!values.mobile) {
        errors.mobile = '请填写管理员手机号码'
    } else if (!isMobile(values.mobile)) {
        errors.mobile = '请填写正确的手机号码'
    }
    if(!values.category){
        errors.category = '请选择机构类型'
    }
    return errors
}

const mapDispatchToProps = dispatch => ({
    onChange: file => {
        dispatch(change('addOrganize', 'file', file))
    },
    onSubmit: (values) => {
        if (!values.file) {
            return toastr.error('请选择机构LOGO')
        }
        return uploadLogo(values.file).then(logo => {
            delete values.file
            values.logo = logo
            Promise.resolve(
                dispatch(getUser({
                    mobile: values.mobile
                }))).then(data => {
                if (data.code === OK) {
                    if (data.get.uid > 0) {
                        return data.get.uid
                    } else {
                        return Promise.resolve(dispatch(addUser({
                            mobile: values.mobile,
                            pwd: values.mobile
                        }).then(data => {
                            if (data.identity > 0) {
                                return data.identity
                            } else {
                                throw new Error(`新建用户失败:${data.msg}`)
                            }
                        })))
                    }
                } else {
                    throw new Error(data.msg)
                }
            }).then(uid => {
                if (uid) {
                    values.uid = uid
                    dispatch(add(values))
                } else {
                    throw new Error('获取用户信息失败!')
                }
            }).catch(error => {
                toastr.error(error.message)
            })
        })
    }
})

export default connect(null,mapDispatchToProps)(reduxForm({
    form: 'addOrganize',
    validate
})(Add))