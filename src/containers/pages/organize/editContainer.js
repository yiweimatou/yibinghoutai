import {
    reduxForm,change
} from 'redux-form'
import EditView from 'components/pages/organize/EditView'
import {
    edit
} from 'actions/organize'
import { uploadLogo } from 'actions/upload'
import { connect } from 'react-redux'

const validate = values => {
    const errors = {}
    if (!values.oname) {
        errors.oname = '请填写机构名称'
    }
    if (!values.state) {
        errors.state = '请选择机构状态'
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
        if( values.file ){
            uploadLogo(values.file).then( logo => {
                organize.logo = logo
                resolve( dispatch( edit( organize ) ) )
            })
        }else{
            resolve(dispatch(edit(organize)))
        }
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: 'editOrganize',
    validate,
    onSubmit
})(EditView))