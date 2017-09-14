import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBackendConfig } from '../redux/application';

class ApplicationRoute extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    modules: PropTypes.object,
    interfaces: PropTypes.object,
    application: PropTypes.object.isRequired,
    getBackendConfig: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.getBackendConfig();
  }

  render() {
    let { interfaces: { eholdings: version } } = this.props;

    return (
      <div className="eholdings-application" data-test-eholdings-application>
        {version ? this.renderApplication() : this.renderNoBackend()}
      </div>
    );
  }

  renderApplication() {
    let { children, application } = this.props;

    if (application.isPending) {
      return (<div>...loading</div>);
    } else if (application.isResolved) {
      let config = application.content;

      return config.isValid ? children : this.renderNotValidConfig();
    }
  }

  renderNoBackend() {
    return (
      <div className="eholdings-no-backend" data-test-eholdings-no-backend>
        <h1>YOU HAVE NO BACKEND. GET ON THAT.</h1>
      </div>
    );
  }

  renderNotValidConfig() {
    return (
      <div className="eholdings-unconfigured-backend" data-test-eholdings-unconfigured-backend>
        <h1>YOU HAVE AN UNCONFIGURED BACKEND. GET ON THAT.</h1>
      </div>
    );
  }
}

export default connect(
  ({
    eholdings: { application },
    discovery: { interfaces = {}}
  }) => ({
    interfaces,
    application
  }),
  { getBackendConfig }
)(ApplicationRoute);
