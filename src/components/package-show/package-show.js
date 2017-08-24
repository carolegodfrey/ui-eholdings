import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import KeyValueLabel from '../key-value-label';
import TitleListItem from '../title-list-item';
import styles from './package-show.css';

export default function PackageShow({ vendorPackage, packageTitles }) {
  return (
    <div data-test-eholdings-package-details>
      <Paneset>
        <Pane defaultWidth="100%">
          {vendorPackage ? (
            <div>
              <div style={{ margin: '2rem 0' }}>
                <KeyValueLabel label="Package">
                  <h1 data-test-eholdings-package-details-name>
                    {vendorPackage.packageName}
                  </h1>
                </KeyValueLabel>
              </div>

              <KeyValueLabel label="Vendor">
                <div data-test-eholdings-package-details-vendor>
                  <Link to={`/eholdings/vendors/${vendorPackage.vendorId}`}>{vendorPackage.vendorName}</Link>
                </div>
              </KeyValueLabel>

              <KeyValueLabel label="Content Type">
                <div data-test-eholdings-package-details-content-type>
                  {vendorPackage.contentType}
                </div>
              </KeyValueLabel>

              <KeyValueLabel label="Titles Selected">
                <div data-test-eholdings-package-details-titles-selected>
                  {vendorPackage.selectedCount}
                </div>
              </KeyValueLabel>

              <KeyValueLabel label="Total Titles">
                <div data-test-eholdings-package-details-titles-total>
                  {vendorPackage.titleCount}
                </div>
              </KeyValueLabel>

              <hr />

              <KeyValueLabel label="Selected">
                <div data-test-eholdings-package-details-selected>
                  {vendorPackage.isSelected ? 'Yes' : 'No'}
                </div>
              </KeyValueLabel>

              <hr />

              {packageTitles && packageTitles.length ? (
                <div>
                  <h3>Titles</h3>
                  <ul data-test-eholdings-package-details-title-list className={styles['list']}>
                    {packageTitles.map(item => (
                      <TitleListItem
                        key={item.titleId}
                        item={item}
                        link={`/eholdings/vendors/${vendorPackage.vendorId}/packages/${vendorPackage.packageId}/titles/${item.titleId}`}
                        showSelected={true}>
                      </TitleListItem>
                    ))}
                  </ul>
                </div>
              ) : packageTitles ? (
                <p>No Titles Found</p>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Pane>
      </Paneset>
    </div>
  );
}

PackageShow.propTypes = {
  vendorPackage: PropTypes.object,
  packageTitles: PropTypes.arrayOf(PropTypes.object)
};
