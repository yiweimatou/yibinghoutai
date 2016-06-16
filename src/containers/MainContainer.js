import Main from '../components/Main'
import {
    connect
} from 'react-redux'
import {
    push
} from 'react-router-redux'
import { logout } from 'actions/auth'

const mapStateToProps = state => {
    return {
        account : state.auth.user.account,
        pathname : state.router.locationBeforeTransitions.pathname
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSelect:(e,value) => {
            dispatch(push(value))
        },
        logoutHandler:()=>{
            dispatch( logout() )
            dispatch(push('/login'))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main)