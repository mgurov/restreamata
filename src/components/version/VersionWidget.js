import React from 'react'
import { connect } from 'react-redux'
import { Popover, OverlayTrigger, Button, Alert } from 'react-bootstrap'

const mapStateToProps = state => {
    return {
        versions: state.versions,
    }
}

function VersionWidget({versions}) {

    if (!versions.server || versions.current === versions.server) {
        return <span>{versions.current}</span>
    } else {
        let reload = () => window.location.reload(true)
        const versionPopover = (
            <Popover id="popover-version" title="Server version differs">
              <Alert>
              Server is ready to serve <strong>{versions.server}</strong> Consider <Button bsStyle="xs" onClick={reload}>reloading</Button> the window.
              </Alert>
              <Alert bsStyle="warning">
              Acks and marked lines will be lost upon reload.
              </Alert>
            </Popover>
        );
        return <OverlayTrigger trigger="click" rootClose placement="right" overlay={versionPopover}>
                    <span className="btn btn-xs btn-warning">{versions.current}</span>
                </OverlayTrigger>
    }

}

export default connect(mapStateToProps)(VersionWidget);