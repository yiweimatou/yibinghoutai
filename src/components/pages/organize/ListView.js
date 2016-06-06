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

const styles = {
    toolbar:{
        float:'right'
    },
    row:{
        backgroundColor:lightBlue50
    }
}
class ListView extends React.Component{
    state = {
        oid:-1
    }
    rowSelection = (index) => {
        if(index.length === 0 && this.state.oid > -1){
            this.state = {
                oid:-1
            }
        }
        else{
            this.state = {
                oid:this.props.list[index[0]].oid
            }
        }
    }
    handleDel = ()=> {
        this.props.deleteHandler(this.state.oid)
    }
    handleEdit = () => {
        this.props.editHandler(this.state.oid)
    }
    render() {
        const {
            list,
            offset,
            limit,
            total,
            onPageClick
        } = this.props
        return (
                <Table
                    fixedHeader={ true }
                    selectable={ true }
                    multiSelectable={ false }
                    onRowSelection = { this.rowSelection }
                >
                    <TableHeader
                    >   
                        <TableRow style={styles.row}>
                            <TableHeaderColumn colSpan="3">
                                <div style={{float:'right'}}>
                                    <IconButton onTouchTap = { this.handleDel }>
                                        <ActionDelete
                                            color={red500}
                                        />
                                    </IconButton>   
                                    <IconButton onTouchTap = { this.handleEdit }>
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
                        {
                            list.map( row => (
                                <TableRow key={row.oid} selected={row.selected}>
                                    <TableRowColumn>{row.oid}</TableRowColumn>
                                    <TableRowColumn>{row.oname}</TableRowColumn>
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
    editHandler:React.PropTypes.func.isRequired,
    list:React.PropTypes.array.isRequired,
    offset:React.PropTypes.number.isRequired,
    limit:React.PropTypes.number.isRequired,
    onPageClick:React.PropTypes.func.isRequired,
    total:React.PropTypes.number.isRequired,
    deleteHandler:React.PropTypes.func.isRequired
}

export default ListView