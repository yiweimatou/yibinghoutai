import {
    push
} from 'react-router-redux'
import {
    connect
} from 'react-redux'
import ListView from 'components/pages/organize/ListView'
import {
    removeRequest,
    fetchList
} from 'actions/organize'
import {
    addErrorMessage
} from 'actions/error'

const mapStateToProps = state => {
    return {
        list: state.organize.list,
        total: state.organize.total,
        limit: state.organize.limit,
        offset: state.organize.offset
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editHandler: id => {
            if (id <= 0) {
                dispatch(addErrorMessage('请先选择一项'))
            } else {
                dispatch(push(`/organize/edit/${id}`))
            }

        },
        deleteHandler: id => {
            if (id <= 0) {
                dispatch(addErrorMessage('请先选择一项'))
            } else {
                dispatch(removeRequest(id))
            }
        },
        detailHandler: id => {
            if (id <= 0) {
                dispatch(addErrorMessage('请先选择一项'))
            } else {
                dispatch(push(`/organize/detail/${id}`))
            }
        },
        onPageClick: (offset, limit) => {
            dispatch(fetchList({
                offset,
                limit
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)