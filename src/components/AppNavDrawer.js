import React from 'react'
import Drawer from 'material-ui/Drawer'
import {List, ListItem, MakeSelectable} from 'material-ui/List'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const SelectableList = MakeSelectable(List)

class AppNavDrawer extends React.Component{
	constructor(){
		super(...arguments)
	}
	static propTypes = {
		location :React.PropTypes.object.isRequired
	}
	static contextTypes = {
		router:React.PropTypes.object
	}
	styles = {
		containerStyle :{
			marginTop:getMuiTheme().appBar.height,
			zIndex:getMuiTheme().zIndex.appBar - 1
		}
	}
	handleSelect = (e,value) =>{
		this.context.router.push(value)
	}
	render(){
		return (
			<Drawer
				open= {true}
				containerStyle = {this.styles.containerStyle}
			>
				<SelectableList
					value = {this.props.location.pathname}
					onChange = {this.handleSelect}
				>
					<ListItem primaryText="后台主页" value="/" />
					<ListItem 
						primaryText="个人设置" 
						primaryTogglesNestedList = {true}
						nestedItems = {[
							<ListItem primaryText = "基本信息" value = "/setting/basic" />,
							<ListItem primaryText = "修改密码" value = "/setting/changepwd" />
						]}			
					/>
				</SelectableList>
			</Drawer>
			)
	}
}

export default AppNavDrawer