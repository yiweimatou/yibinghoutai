import React from 'react'
import {
    Table, 
    TableBody, 
    TableHeader, 
    TableHeaderColumn, 
    TableRow, 
    TableRowColumn, 
    IconButton
} from 'material-ui'
import {EditorModeEdit} from 'material-ui/svg-icons'
import PagingTableFooter from '../../PagingTableFooter.js'
import { blue500,lightBlue50 } from 'material-ui/styles/colors'

const styles = {
    toolbar:{
        float:'right'
    },
    row:{
        backgroundColor:lightBlue50
    }
}

class ListView extends React.Component {
    state = {
        uid:-1
    }
    rowSelection = (index) => {
        if(index.length === 0 && this.state.oid > -1){
            this.state = {
                uid:-1
            }
        }
        else{
            this.state = {
                uid:this.props.list[index[0]].uid
            }
        }
    }
    handleEdit = () =>{
        this.props.editHandler(this.state.uid)
    }
    render (){
        const {
            list,offset,limit,total,onPageClick
        } = this.props
        return (
            <Table
                fixedHeader = { true }
                selectable = { true }
                multiSelectable ={ false }
                onRowSelection = { this.rowSelection }
            >
                <TableHeader>
                    <TableRow style={styles.row}>
                            <TableHeaderColumn colSpan="4">
                                <div style={{float:'right'}}> 
                                    <IconButton onTouchTap = { this.handleEdit }>
                                        <EditorModeEdit
                                            color={ blue500 }
                                        />
                                    </IconButton>                             
                                </div>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="用户ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="用户姓名">用户姓名</TableHeaderColumn>
                            <TableHeaderColumn tooltip="手机号码">手机号码</TableHeaderColumn>
                            <TableHeaderColumn tooltip="用户状态">用户状态</TableHeaderColumn>
                        </TableRow>
                </TableHeader>
                <TableBody
                        displayRowCheckbox={true}
                        deselectOnClickaway={false}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {
                            list.map( row => (
                                <TableRow key={row.uid} selected={ row.selected }>
                                    <TableRowColumn>{row.uid}</TableRowColumn>
                                    <TableRowColumn>{row.cname}</TableRowColumn>
                                    <TableRowColumn>{row.mobile}</TableRowColumn>
                                    <TableRowColumn>{row.state===1?'正常':row.state===2?'冻结':'永久冻结'}</TableRowColumn>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    <PagingTableFooter
                        offset = { offset }
                        total = { total }
                        limit = { limit }
                        onPageClick = { onPageClick }
                    />
            </Table>
        )
    }
}

ListView.propTypes = {
    editHandler : React.PropTypes.func.isRequired,
    list : React.PropTypes.array.isRequired,
    offset:React.PropTypes.number.isRequired,
    limit:React.PropTypes.number.isRequired,
    onPageClick:React.PropTypes.func.isRequired,
    total:React.PropTypes.number.isRequired
}

export default ListView