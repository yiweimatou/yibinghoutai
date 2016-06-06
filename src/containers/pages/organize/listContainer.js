import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import ListView from 'components/pages/organize/ListView'
import { removeRequest,fetchListIfNeeded } from 'actions/organize'
// import { addErrorMessage } from 'actions/error'

const mapStateToProps = state => {
    return {
        list:state.organize.list,
        total:state.organize.total,
        limit:state.organize.limit,
        offset:state.organize.offset
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editHandler:(id) => {
            dispatch(push(`/organize/edit/${id}`))
        },
        deleteHandler: (id) => {
            console.log(id)
            dispatch(removeRequest(id))
        },
        onPageClick:(offset,limit) => {
            dispatch(fetchListIfNeeded({
                offset,limit
            }))
        }
        // ,
        // notice:(message) => {
        //     dispatch(addErrorMessage(message))
        // }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(ListView)