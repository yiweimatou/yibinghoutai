import React from 'react'
import Drawer from 'material-ui/Drawer'
import { List, ListItem, MakeSelectable } from 'material-ui/List'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const SelectableList = MakeSelectable(List)
const styles = {
    containerStyle :{
        marginTop:getMuiTheme().appBar.height,
        zIndex:getMuiTheme().zIndex.appBar - 1
    },
    listStyle:{
        paddingTop:'0px'
    }
}

class AppNavDrawer extends React.Component{
	render(){
        const {
            open,handleSelect,pathname
        } = this.props
		return (
			<Drawer
				open= {open}
				containerStyle = {styles.containerStyle}
			>
				<SelectableList
					value = {pathname}
					onChange = {handleSelect}
					style = {styles.listStyle}
				>
					<ListItem primaryText="后台主页" value="/" />
					<ListItem 
						primaryText="机构管理" 
						primaryTogglesNestedList = {true}
						nestedItems = {[
							<ListItem primaryText = "新增" value = "/organize/add" />,
							<ListItem primaryText = "列表" value = "/organize/list" />
						]}			
					/>
                    <ListItem 
						primaryText="用户管理" 
						primaryTogglesNestedList = {true}
						nestedItems = {[
							<ListItem primaryText = "新增" value = "/user/add" />,
							<ListItem primaryText = "列表" value = "/user/list" />,
							<ListItem primaryText = "重置密码" value = "/user/resetpwd" />
						]}			
					/>
					<ListItem 
						primaryText="个人设置" 
						primaryTogglesNestedList = {true}
						nestedItems = {[
							<ListItem primaryText = "修改密码" value = "/setting/changepwd" />
						]}			
					/>
				</SelectableList>
			</Drawer>
			)
	}
}

AppNavDrawer.propTypes = {
    pathname :React.PropTypes.string.isRequired,
    handleSelect:React.PropTypes.func.isRequired,
    open:React.PropTypes.bool.isRequired
}
export default AppNavDrawer