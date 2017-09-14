/* global describe, beforeEach */
import { expect } from 'chai';
import it from './it-will';

import { describeApplication } from './helpers';
import TitleShowPage from './pages/title-show';

describeApplication('TitleShow', function() {
  let title, customerResources;

  beforeEach(function() {
    title = this.server.create('title', 'withPackages', {
      titleName: 'Cool Title',
      publisherName: 'Cool Publisher'
    });

    title.subjects = [
      this.server.create('subject', { subject: 'Cool Subject 1' }),
      this.server.create('subject', { subject: 'Cool Subject 2' }),
      this.server.create('subject', { subject: 'Cool Subject 3' })
    ];
    title.identifiers = [
      this.server.create('identifier', { type: 1, subtype: 1, id: '978-0547928210' }),
      this.server.create('identifier', { type: 1, subtype: 1, id: '978-0547928203' }),
      this.server.create('identifier', { type: 1, subtype: 2, id: '978-0547928197' }),
      this.server.create('identifier', { type: 1, subtype: 0, id: '978-0547928227' })
    ];
    title.contributors = [
      this.server.create('contributor', { type: 'author', contributor: 'Sally Writer' }),
      this.server.create('contributor', { type: 'author', contributor: 'Jane Wordsmith' }),
      this.server.create('contributor', { type: 'illustrator', contributor: 'John Artist' })
    ];
    title.save();

    customerResources = title.customerResources.models;
  });

  describe("visiting the title page", function() {
    beforeEach(function() {
      return this.visit(`/eholdings/titles/${title.id}`, () => {
        expect(TitleShowPage.$root).to.exist;
      });
    });

    it('displays the title name', function() {
      expect(TitleShowPage.titleName).to.equal('Cool Title');
    });

    it('displays the publisher name', function() {
      expect(TitleShowPage.publisherName).to.equal('Cool Publisher');
    });

    it('displays the publication type', function() {
      expect(TitleShowPage.publicationType).to.equal(title.pubType);
    });

    it('groups together identifiers of the same type and subtype', function() {
      expect(TitleShowPage.identifiersList[0]).to.equal('ISBN (Print)978-0547928210 978-0547928203');
    });

    it('does not group together identifiers of the same type, but not the same subtype', function() {
      expect(TitleShowPage.identifiersList[1]).to.equal('ISBN (Online)978-0547928197');
    });

    it('does not show a subtype for an identifier when none exists', function() {
      expect(TitleShowPage.identifiersList[2]).to.equal('ISBN978-0547928227');
    });

    it('displays the authors', function() {
      expect(TitleShowPage.contributorsList[0]).to.equal('AuthorsSally Writer, Jane Wordsmith');
    });

    it('displays the illustrator', function() {
      expect(TitleShowPage.contributorsList[1]).to.equal('IllustratorJohn Artist');
    });

    it('does not display an editor', function() {
      expect(TitleShowPage.contributorsList[2]).to.be.undefined;
    });

    it('displays the subjects list', function() {
      expect(TitleShowPage.subjectsList).to.equal('Cool Subject 1; Cool Subject 2; Cool Subject 3');
    });

    it('displays a list of customer resources', function() {
      expect(TitleShowPage.packageList).to.have.lengthOf(customerResources.length);
    });

    it('displays name of a package in the customer resource list', function() {
      expect(TitleShowPage.packageList[0].name).to.equal(customerResources[0].package.packageName);
    });

    it('displays whether the first customer resource is selected', function() {
      expect(TitleShowPage.packageList[0].isSelected).to.equal(customerResources[0].isSelected);
    });
  });

  describe("encountering a server error", function() {
    beforeEach(function() {
      this.server.get('/titles/:titleId', [{
        message: 'There was an error',
        code: "1000",
        subcode: 0
      }], 500);

      return this.visit(`/eholdings/titles/${title.titleId}`, () => {
        expect(TitleShowPage.$root).to.exist;
      });
    });

    it("dies with dignity", function() {
      expect(TitleShowPage.hasErrors).to.be.true;
    });
  });
});
