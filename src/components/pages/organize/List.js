import React from 'react'
import {
    Table, 
    TableBody, 
    TableHeader, 
    TableHeaderColumn, 
    TableRow, 
    TableRowColumn, 
    Dialog,IconButton,RaisedButton
}
  from 'material-ui'
import {ActionDelete,EditorModeEdit} from 'material-ui/svg-icons'
import PagingTableFooter from '../../PagingTableFooter.js'
import {red500,blue500,lightBlue50} from 'material-ui/styles/colors'
import Organize from 'models/Organize'
import Edit from './Edit.js'
import {
    CODE,
    LIMIT,
    ORGANIZE_STATE
} from 'constants/enumerate'

const styles = {
    toolbar:{
        float:'right'
    },
    row:{
        backgroundColor:lightBlue50
    }
}
class List extends React.Component{
    constructor(){
        super(...arguments)
        this.state={
            data:[],
            offset:1,
            total:0,
            rowid:-1,
            id:localStorage.id||sessionStorage.id,
            token:localStorage.token||sessionStorage.token,
            open:false,
            selected:{}
        }
    }
    componentWillMount(){        
        this.getList()
        this.getInfo()
    }
    getInfo(oname=''){
        let self = this
        Organize.info({oname:oname}).then(res=>{
            if(res.code === CODE.NORMAL){
                self.setState({
                    total:res.data.count
                })
            }
        })
    }
    getList(offset = 1){
        let self = this
        const length = self.state.data.length
        this.setState({
            offset:offset
        })
        //do not fetch if have the data
        if(length> 0 && Math.ceil(length/LIMIT)>=offset)
            return
        Organize.list({offset:offset,limit:LIMIT}).then(res=>{
            if(res.code === CODE.NORMAL){
                self.setState({
                    data:self.state.data.concat(res.data),
                })
            }
        })   
    }
    handleOpen = () => {
        this.setState({open: true});
    }
    handleClose = () => {
        this.setState({open: false});
    }
    edit = () => {
        this.handleOpen()
        this.setState({
            selected:this.state.data[this.state.rowid]
        })
    }
    rowSelection = (index) => {
        if(index.length === 0){
            this.state = Object.assign({},this.state,{rowid:-1})
        }
        else{
            this.state=Object.assign({},this.state,{rowid:index[0]+(this.state.offset-1)*LIMIT})
        }
    }
    pagingFillter(item,index){
        let start = (this.state.offset-1)*LIMIT
        let end = start+LIMIT
        return index>=start && index <=end
    }
    render(){
        const actions = [
            <RaisedButton
                label="取消"
                onTouchTap={this.handleClose}
                style = {{marginRight:10}}
            />,
            <RaisedButton
                label="确定"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ]
        return (
                <div>
                    <Table
                        fixedHeader={true}
                        selectable={true}
                        multiSelectable={false}
                        onRowSelection = {this.rowSelection}
                    >
                        <TableHeader
                        >   
                            <TableRow style={styles.row}>
                                <TableHeaderColumn colSpan="3">
                                    <div style={{float:'right'}}>
                                        <IconButton onTouchTap = {this.edit}>
                                            <EditorModeEdit
                                                color={blue500}
                                            />
                                        </IconButton>                                  
                                    </div>
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn tooltip="机构ID">ID</TableHeaderColumn>
                                <TableHeaderColumn tooltip="机构名称">机构名称</TableHeaderColumn>
                                <TableHeaderColumn tooltip="机构状态">机构状态</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={true}
                            deselectOnClickaway={false}
                            showRowHover={true}
                            stripedRows={false}
                        >
                            {this.state.data.filter(this.pagingFillter,this).map( (row, index) => (
                                <TableRow key={row.oid} selected={row.selected}>
                                    <TableRowColumn>{row.oid}</TableRowColumn>
                                    <TableRowColumn>{row.oname}</TableRowColumn>
                                    <TableRowColumn>{row.state===1?'正常':row.state===2?'冻结':'永久冻结'}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                        <PagingTableFooter 
                            adjustForCheckbox={false}
                            offset = {this.state.offset} 
                            limit = {LIMIT}
                            onPageClick = {this.getList.bind(this)}
                            total = {this.state.total}
                        />
                </Table>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <Edit organize={this.state.selected}/>
                </Dialog>
            </div>
        )
    }
}

module.exports = List