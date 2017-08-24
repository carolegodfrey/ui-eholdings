import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import View from '../../components/package-title-show';

export default class packageTitleShowRoute extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        packageId: PropTypes.string.isRequired,
        titleId: PropTypes.string.isRequired,
        vendorId: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    resources: PropTypes.shape({
      packageTitle: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object)
      })
    }),
    mutator: PropTypes.shape({
      packageTitle: PropTypes.shape({
        PUT: PropTypes.func,
        GET: PropTypes.func,
      }),
    }).isRequired,
  };

  static manifest = Object.freeze({
    packageTitle: {
      type: 'okapi',
      path: 'eholdings/vendors/:{vendorId}/packages/:{packageId}/titles/:{titleId}',
      pk: 'titleId'
    }
  });

  constructor(props) {
    super(props);
    this.okapiUrl = 'https://okapi.frontside.io';
    this.httpHeaders = Object.assign({}, {
      'X-Okapi-Tenant': 'fs',
      'Content-Type': 'application/json',
    });
    // console.log(this);
    // this.getCustomerResource = this.getCustomerResource.bind(this);
    this.saveSelection = this.saveSelection.bind(this);
    console.log(this);
    // console.log(this);
  }

  render() {
    // console.log(this);
    return (
      <View 
        packageTitle={this.getPackageTitle()}
        saveSelection={this.saveSelection}
      />
    );
  }

  saveSelection(event) {
    console.log("saving selection", event.target.checked);
    console.log("store ", this.store);
    console.log("this ", this.store);

    const {
      resources: { packageTitle },
      match: { params: { vendorId, packageId, titleId } }
    } = this.props;
    // this.props.mutator.packageTitle.PUT({'isSelected': event.target.checked})
    fetch(`${this.okapiUrl}/eholdings/vendors/${vendorId}/packages/${packageId}/titles/${titleId}`, {
      method: 'PUT',
      headers: this.httpHeaders,
      body: JSON.stringify({'isSelected': event.target.checked}),
    }).then((response) => {
      console.log(response);
    })
  }

  getPackageTitle() {
    const {
      resources: { packageTitle },
      match: { params: { vendorId, packageId, titleId } }
    } = this.props;

    if (!packageTitle) {
      return null;
    }

    console.log("packageTitle", packageTitle)

    return packageTitle.records.find((title) => {
      return title.titleId == titleId && title.customerResourcesList.some((customerResource) => {
        return customerResource.packageId == packageId && customerResource.vendorId == vendorId;
      });
    });
  }
}
