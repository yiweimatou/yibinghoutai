import React from 'react'
import {
    AppBar,
    Paper,
    Snackbar
} from 'material-ui'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import AppNavDrawer from './AppNavDrawer'

const styles = {
    label:{
        color:'white'
    },
    paper:{
        margin:20,
        padding:20
    }
}
class Main extends React.Component {
    state = {
        open:true,
        margin:{
            marginLeft:256
        }
    }
    handleNavButtonTouch = ()=> {
        this.setState({
            open:!this.state.open,
            margin:{
                marginLeft:this.state.margin.marginLeft===0?256:0
            }
        })
    }
    render() {
        const {
            pathname,
            account,
            handleSelect,
            dismiss,
            errorMessage,
            handleActionTouchTap
        } = this.props
        return (
            <div>
                <AppBar 
                    title = '管理后台'
                    onLeftIconButtonTouchTap = {this.handleNavButtonTouch}
                    iconElementRight={
                            <IconMenu
                                iconButtonElement={
                                <FlatButton labelStyle={styles.label} label={ account } />
                                }
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem primaryText="个人设置" />
                                <MenuItem primaryText="安全退出" />
                            </IconMenu>
                    }
                />
                <AppNavDrawer 
                    open = {this.state.open} 
                    pathname = { pathname }
                    handleSelect = { handleSelect }
                />
                <div style = { this.state.margin}>
                    <Paper style = { styles.paper } >
                        {this.props.children}
                    </Paper>
                </div>
                <Snackbar
                    open = { !dismiss }
                    message = { errorMessage }
                    action="确定"
                    onActionTouchTap={ handleActionTouchTap }
                />
            </div>
        )
    }
}

Main.propTypes = {
    children:React.PropTypes.node,
    account:React.PropTypes.string.isRequired,
    pathname:React.PropTypes.string.isRequired,
    handleSelect:React.PropTypes.func.isRequired,
    errorMessage:React.PropTypes.string,
    handleActionTouchTap:React.PropTypes.func.isRequired,
    dismiss:React.PropTypes.bool.isRequired
}

export default Main