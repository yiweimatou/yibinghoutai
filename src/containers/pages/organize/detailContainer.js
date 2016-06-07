import { connect } from 'react-redux'
import DetailView from 'components/pages/organize/DetailView'

const mapStateToProps = state => {
    return {
        organize:state.organize.detail
    }
}

export default connect ( mapStateToProps )(DetailView)