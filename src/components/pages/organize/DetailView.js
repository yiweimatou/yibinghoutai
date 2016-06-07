import React from 'react'

const styles = {
    div:{
        display:'flex',
        flexFlow:'row wrap'
    },
    img:{
        width: 256,
        heigt:256
    },
    dl:{
        marginLeft:50
    },
    dt:{
        float: 'left',
        width: 160,
        overflow: 'hidden',
        clear: 'left',
        textAlign: 'right',
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
        lineHeight: 1.42857143
    },
    dd:{
        marginLeft: 180,
        lineHeight: 1.42857143
    }
}
class DetailView extends React.Component {
    
    render() {
        const {
            organize
        } = this.props
        if(organize=== null){
            return (null)
        }
        return (
            <div style = { styles.div } >
                <img src={organize.logo} alt='logo' style = { styles.img }/>                
                <dl>
                    <dt style = {styles.dt}>机构名</dt>
                    <dd style = {styles.dd}>
                        {organize.oname}
                    </dd>
                    <dt style = {styles.dt}>机构状态</dt>
                    <dd style = {styles.dd}>
                        {organize.state===1?'正常':organize.state===2?'冻结':'永久冻结'}
                    </dd>
                    <dt style = {styles.dt}>管理员</dt>
                    <dd style = {styles.dd}>
                        {organize.admin || organize.uid}
                    </dd>
                    <dt style = {styles.dt}>机构描述</dt>
                    <dd style = {styles.dd}>
                        {organize.descript}
                    </dd>
                </dl>
            </div>
        )
    }
}

DetailView.propTypes = {
    organize: React.PropTypes.object
}
export default DetailView 