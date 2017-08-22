import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import View from '../../components/customer-resource-show';

export default class CustomerResourceShowRoute extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        packageId: PropTypes.string.isRequired,
        titleId: PropTypes.string.isRequired,
        vendorId: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    resources: PropTypes.shape({
      customerResource: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object)
      })
    }),
    mutator: PropTypes.shape({
      customerResource: PropTypes.shape({
        PUT: PropTypes.func,
        GET: PropTypes.func,
      }),
    }).isRequired,
  };

  static manifest = Object.freeze({
    customerResource: {
      type: 'okapi',
      path: 'eholdings/vendors/:{vendorId}/packages/:{packageId}/titles/:{titleId}',
      pk: 'titleId',
      records: 'customerResourcesList'
      // GET: {
      //   path: 'eholdings/vendors/:{vendorId}/packages/:{packageId}/titles/:{titleId}',
      // },
      // PUT: {
      //   path: 'eholdings/vendors/:{vendorId}/packages/:{packageId}/titles/:{titleId}'
      // }
    }
  });

  constructor(props) {
    super(props);
    this.getCustomerResource = this.getCustomerResource.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  render() {
    return (
      <View 
        customerResource={this.getCustomerResource()}
        saveChanges={this.saveChanges}
      />
    );
  }

  getCustomerResource() {
    const {
      resources: { customerResource }
    } = this.props;

    if (!customerResource) {
      return null;
    }
    return customerResource.records[0];
  }

  saveChanges(event) {
    console.log("checked is ", event.target.checked);
    this.props.mutator.customerResource.PUT({'titleId': this.props.data.customerResource[0].titleId, 'isSelected': event.target.checked})
    
    // this.getCustomerResource();
  }
}
