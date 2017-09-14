/* global describe, beforeEach */
import { expect } from 'chai';
import it from './it-will';

import { describeApplication } from './helpers';
import { Response } from 'mirage-server';
import ApplicationPage from './pages/application';

describeApplication('With No Backend Configuration', {
  scenarios: ['no-backend'],

  suite() {
    describe('when there is no backend module at all', function() {
      beforeEach(function() {
        return this.visit('/eholdings', () => expect(ApplicationPage.$root).to.exist);
      });

      it('blocks access to the eholdings app and tells me that I need to install a backend', function () {
        expect(ApplicationPage.doesNotHaveBackend).to.be.true;
      });
    });
  }
});

describeApplication.only('With Bad Backend Configuration', {
  scenarios: ['unconfigured-backend'],

  suite() {
    describe('when there is a backend module, but it is not properly configured', function() {
      beforeEach(function() {
        return this.visit('/eholdings', () => expect(ApplicationPage.$root).to.exist);
      });

      it('blocks access to the eholdings app and points you to the configuration screen', function() {
        expect(ApplicationPage.backendNotConfigured).to.be.true;
      });
    });

    describe('configuring the mod-kb-ebsco backend', function() {
      it('has a description of itself');
      it('has an option for production or sandbox');
      it('has a field for the ebsco product id');
      it('has a field for the ebsco RM API KEY');
      it('has an "apply" button, but it starts out as disabled');

      describe('filling out with data', function() {
        it('enables the "apply" button');
        it('enables the cancel button');

        describe('Applying the changes', function() {
          it('disables the apply button');
          it('indicates that it is working');

          describe('when the changes succeed', function() {
            it('indicates it is no longer working');

            describe('going to the main app page', function() {
              it('is no longer blocked');
            });
          });
        });

        describe('. When the validation fails', function() {
          it('does not enable the "apply" button');
        });


        describe('. Hitting the cancel button', function() {
          it('reverts the changes');
        });

      });
    });

    describe('configuring the mod-go-kb backend', function() {
      it('has yet to be implemented');
    });
  }
});
