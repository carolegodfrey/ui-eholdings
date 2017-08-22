import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import KeyValueLabel from './key-value-label';
import { Field, reduxForm } from 'redux-form';
import Checkbox from '@folio/stripes-components/lib/Checkbox';

export default function CustomerResourceShow({ customerResource, saveChanges }) {
  return (
    <div data-test-eholdings-customer-resource-show>
      <Paneset>
        <Pane defaultWidth="100%">
          {customerResource ? (
            <div>
              <div style={{ margin: '2rem 0' }}>
                <KeyValueLabel label="Resource">
                  <h1 data-test-eholdings-customer-resource-show-title-name>
                    "test"
                  </h1>
                </KeyValueLabel>
              </div>

              <KeyValueLabel label="Package">
                <div data-test-eholdings-customer-resource-show-package-name>
                  <Link to={`/eholdings/vendors/${customerResource.vendorId}/packages/${customerResource.packageId}`}>{customerResource.packageName}</Link>
                </div>
              </KeyValueLabel>

              <KeyValueLabel label="Vendor">
                <div data-test-eholdings-customer-resource-show-vendor-name>
                  <Link to={`/eholdings/vendors/${customerResource.vendorId}`}>{customerResource.vendorName}</Link>
                </div>
              </KeyValueLabel>

              <hr />
                <div data-test-eholdings-customer-resource-show-selected>
                  <Checkbox
                    label="Selected"
                    name="resource_selected"
                    checked={customerResource.isSelected}
                    onChange={saveChanges}
                  />
                </div>
              <hr />

              <div>
                <Link to={`/eholdings/titles/${customerResource.titleId}`}>
                  View all packages that include this title
                </Link>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Pane>
      </Paneset>
    </div>
  );
}

CustomerResourceShow.propTypes = {
  customerResource: PropTypes.object,
  saveChanges: PropTypes.func
};
