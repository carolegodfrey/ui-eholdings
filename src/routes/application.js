import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ApplicationRoute extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    interfaces: PropTypes.object
  }

  render() {
    let {
      children,
      interfaces: { eholdings: version }
    } = this.props;
    return (
      <div className="eholdings-application" data-test-eholdings-application>{version ? children : this.renderNoBackend()}</div>
    );
  }

  renderNoBackend() {
    return (<div className="eholdings-no-backend" data-test-eholdings-no-backend></div>);
  }
}

export default connect(
  ({ discovery: { interfaces = {}}}) => ({ interfaces })
)(ApplicationRoute);
