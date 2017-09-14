import $ from 'jquery';
import { convergeOn } from '../it-will';
import { expect } from 'chai';

export default  {
  get $root() {
    return $('[data-test-eholdings-application]');
  },
  get doesNotHaveBackend() {
    return $('[data-test-eholdings-no-backend]').length > 0;
  },
  get backendNotConfigured() {
    return $('[data-test-eholdings-unconfigured-backend]').length > 0;
  }
};
