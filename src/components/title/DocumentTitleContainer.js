import { connect } from 'react-redux'
import DocumentTitle from './DocumentTitle'

const mapStateToProps = state => {
    let title = state.config.serviceName
    const pendingCount = state.data.data.hitStats.count
    if (pendingCount > 0) {
        title += ' - ' + pendingCount
    }
    return {
        title,
    }
}

const DocumentTitleContainer = connect(mapStateToProps)(DocumentTitle)
export default DocumentTitleContainer