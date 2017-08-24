import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import KeyValueLabel from './key-value-label';
import Checkbox from '@folio/stripes-components/lib/Checkbox';

export default function PackageTitleShow({ packageTitle, saveSelection }) {
  return (
    <div data-test-eholdings-customer-resource-show>
      <Paneset>
        <Pane defaultWidth="100%">
          {packageTitle ? (
            <div>
              <div style={{ margin: '2rem 0' }}>
                <KeyValueLabel label="Resource">
                  <h1 data-test-eholdings-customer-resource-show-title-name>
                    {packageTitle.titleName}
                  </h1>
                </KeyValueLabel>
              </div>

              <KeyValueLabel label="Package">
                <div data-test-eholdings-customer-resource-show-package-name>
                  <Link to={`/eholdings/vendors/${packageTitle.customerResourcesList[0].vendorId}/packages/${packageTitle.customerResourcesList[0].packageId}`}>{packageTitle.customerResourcesList[0].packageName}</Link>
                </div>
              </KeyValueLabel>

              <KeyValueLabel label="Vendor">
                <div data-test-eholdings-customer-resource-show-vendor-name>
                  <Link to={`/eholdings/vendors/${packageTitle.customerResourcesList[0].vendorId}`}>{packageTitle.customerResourcesList[0].vendorName}</Link>
                </div>
              </KeyValueLabel>

              <hr />
                <div data-test-eholdings-customer-resource-show-selected>
                  <Checkbox
                    label="Selected"
                    name="resource_selected"
                    checked={packageTitle.customerResourcesList[0].isSelected}
                    onChange={saveSelection}
                  />
                </div>
              <hr />

              <div>
                <Link to={`/eholdings/titles/${packageTitle.titleId}`}>
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

PackageTitleShow.propTypes = {
  // TODO: shape
  packageTitle: PropTypes.object,
  saveSelection: PropTypes.func
};
