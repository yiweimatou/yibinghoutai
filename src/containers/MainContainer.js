import Main from '../components/Main'
import {
    connect
} from 'react-redux'
import {
    push
} from 'react-router-redux'
import {
    resetErrorMessage
} from 'actions/error'

const mapStateToProps = state => {
    return {
        account : state.auth.user.account,
        pathname : state.router.locationBeforeTransitions.pathname,
        dismiss : state.error.dismiss,
        errorMessage:state.error.errorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSelect:(e,value) => {
            dispatch(push(value))
        },
        handleActionTouchTap:()=> {
            dispatch(resetErrorMessage())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main)