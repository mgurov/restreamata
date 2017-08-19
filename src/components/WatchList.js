import React, { Component } from 'react';
import Watch from './Watch'
import PropTypes from 'prop-types';
import EditWatchForm from './EditWatchForm'
import { CSSTransitionGroup } from 'react-transition-group'
import './WatchList.css'

class WatchList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }
        let that = this
        this.onEditClick = (watch) => {
            that.setState({ editing: watch })
        }
        this.onClose = () => {
            that.setState({ editing: false })
        }
        this.onSave = (text) => {
            that.props.onWatchEdited(
                that.state.editing.id,
                text
            )
            that.onClose()
        }
        this.onDelete = () => {
            that.props.onWatchDeleted(that.state.editing.id)
            that.onClose()
        }
    }

    render() {
        var watches = this.props.watches.map((k, v) => (<Watch key={'item_' + k.id} name={k.text} onClick={() => this.onEditClick(k)} />))

        let edit = !this.state.editing || <EditWatchForm
                visible={!!this.state.editing}
                text={this.state.editing.text}
                onClose={this.onClose}
                onSave={this.onSave}
                onDelete={this.onDelete}
            />

        return (<span>
            <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={700}>
            {watches}
            </CSSTransitionGroup>
            {edit}
        </span>)
    }
}

WatchList.propTypes = {
    onWatchEdited: PropTypes.func.isRequired,
    onWatchDeleted: PropTypes.func.isRequired,
    watches: PropTypes.array.isRequired,
}

export default WatchList;