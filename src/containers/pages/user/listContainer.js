import { push } from 'react-router-redux'
import ListView from 'components/pages/user/ListView'
import { addErrorMessage } from 'actions/error'
import { connect } from 'react-redux'
import { fetchUserList } from 'actions/user'

const mapStateToProps = state => {
    return {
        list: state.user.list,
        total: state.user.total,
        limit: state.user.limit,
        offset: state.user.offset
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        editHandler : id => {
            if(id <= 0) {
                dispatch(addErrorMessage('请先选择一项'))
            } else {
                dispatch(push(`/user/edit/${id}`))
            }
        },
        onPageClick: (offset, limit) => {
            dispatch(fetchUserList({
                offset,
                limit
            }))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ListView)
