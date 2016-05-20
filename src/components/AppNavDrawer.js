import React from 'react'
import {withRouter} from 'react-router'
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
	styles = {
		containerStyle :{
			marginTop:getMuiTheme().appBar.height,
			zIndex:getMuiTheme().zIndex.appBar - 1
		},
		listStyle:{
			paddingTop:'0px'
		}
	}
	handleSelect = (e,value) =>{
		this.props.router.push(value)
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
					style = {this.styles.listStyle}
				>
					<ListItem primaryText="后台主页" value="/" />
					<ListItem 
						primaryText="机构管理" 
						primaryTogglesNestedList = {true}
						nestedItems = {[
							<ListItem primaryText = "新增" value = "/organize/add" />,
							<ListItem primaryText = "1234" value = "/setting/changepwd" />
						]}			
					/>
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

export default withRouter(AppNavDrawer)