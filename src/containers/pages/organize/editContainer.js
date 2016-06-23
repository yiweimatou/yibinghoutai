import {
    reduxForm,change
} from 'redux-form'
import EditView from 'components/pages/organize/EditView'
import {
    edit
} from 'actions/organize'
import { uploadLogo } from 'actions/upload'
import { isMobile } from 'utils/validation'
import { connect } from 'react-redux'
import { getUserIfNeeded,add } from 'actions/user'

const validate = values => {
    const errors = {}
    if (!values.oname) {
        errors.oname = '请填写机构名称'
    }
    if (!values.state) {
        errors.state = '请选择机构状态'
    }
    if(!values.mobile){
        errors.mobile = '请输入管理员手机号'
    }else if( !isMobile(values.mobile)){
        errors.mobile = '请输入正确的手机号码'
    }
    return errors
}

const mapStateToProps = state => ({
    organize:state.organize.detail
})

const mapDispatchToProps = dispatch => ({
    onChange:file => {
        dispatch( change('editOrganize','file',file) )
    }
})

const onSubmit = (values, dispatch) => {
    let organize = {
        oid:values.oid,
        oname:values.oname,
        state:values.state,
        descript:values.descript,
        logo : values.logo
    }
    return new Promise((resolve) => {
        dispatch( getUserIfNeeded({mobile:values.mobile}) ).then(user=>{
            if( !user ){
                return dispatch( add({mobile:values.mobile,pwd:values.mobile}) ).then(data=>{
                    if( data.code === 200 && data.identity ) {
                        return data.identity
                    }else{
                        throw new Error( '创建用户失败' )
                    }
                })
            }else{
                return user.uid
            }
        }).then( uid => {
            if( !uid ){
                return resolve()
            }
            organize.uid = uid
            if( values.file ){
                uploadLogo(values.file).then( logo => {
                    organize.logo = logo
                    resolve( dispatch( edit( organize ) ) )
                })
            }else{
                resolve(dispatch(edit(organize)))
            }
        }).catch( error=>{
            resolve( error.message )
        })
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: 'editOrganize',
    validate,
    onSubmit
})(EditView))