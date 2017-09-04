import React from 'react'
import { connect } from 'react-redux'
import { fetchData, selectSyncTime, removeTillId, toggleFavorite } from '../../actions'
import DataList from './DataList'
import { Alert } from 'react-bootstrap'
import {SyncTimeControl} from './SyncTimeControl'
import _ from 'lodash'
import {ViewSize} from './const.js'
import {SelectTimeRange} from '../timerange/SelectTimeRange'

const mapStateToProps = state => {
    return {
        data: state.data,
        synctimes: state.synctimes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDataAsked: () => {
            dispatch(fetchData())
        },
        onSyncSelected: (st) => {
            dispatch(selectSyncTime(st))
        },
        removeTillId: (id) => {
            dispatch(removeTillId(id))
        },
        toggleFavorite: (id) => {
            dispatch(toggleFavorite(id))
        },
    }
}

function DataListContainer(props) {

    let error = null;
    if (props.data.error) {
        error = (<Alert bsStyle="warning">
            {props.data.error.name} {props.data.error.message}
        </Alert>)
    }

    let syncControl
    if (props.synctimes.selected) {
        syncControl = <SyncTimeControl 
        selected={props.synctimes.selected} 
        acked={props.data.data.acked} 
        notAcked={props.data.data.hitStats}
        lastSync={props.data.lastSync}
        />
    } else {
        syncControl = <SelectTimeRange options={props.synctimes.options} onSelected={props.onSyncSelected}/>
    }

    let toShow = _.take(props.data.data.hits, ViewSize)

    return (<div>
        {syncControl}
        {error}
        <DataList data={toShow} removeTillId={props.removeTillId} toggleFavorite={props.toggleFavorite} />
    </div>)
}

let WatchListContainer = connect(mapStateToProps, mapDispatchToProps)(DataListContainer)

export default WatchListContainer