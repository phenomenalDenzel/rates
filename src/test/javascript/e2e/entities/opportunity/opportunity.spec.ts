import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OpportunityComponentsPage, { OpportunityDeleteDialog } from './opportunity.page-object';
import OpportunityUpdatePage from './opportunity-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Opportunity e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let opportunityComponentsPage: OpportunityComponentsPage;
  let opportunityUpdatePage: OpportunityUpdatePage;
  /* let opportunityDeleteDialog: OpportunityDeleteDialog; */
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Opportunities', async () => {
    await navBarPage.getEntityPage('opportunity');
    opportunityComponentsPage = new OpportunityComponentsPage();
    expect(await opportunityComponentsPage.title.getText()).to.match(/Opportunities/);

    expect(await opportunityComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([opportunityComponentsPage.noRecords, opportunityComponentsPage.table]);

    beforeRecordsCount = (await isVisible(opportunityComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(opportunityComponentsPage.table);
  });

  it('should load create Opportunity page', async () => {
    await opportunityComponentsPage.createButton.click();
    opportunityUpdatePage = new OpportunityUpdatePage();
    expect(await opportunityUpdatePage.getPageTitle().getAttribute('id')).to.match(/ratesApp.opportunity.home.createOrEditLabel/);
    await opportunityUpdatePage.cancel();
  });

  /*  it('should create and save Opportunities', async () => {
        await opportunityComponentsPage.createButton.click();
        await opportunityUpdatePage.setNameInput('name');
        expect(await opportunityUpdatePage.getNameInput()).to.match(/name/);
        await opportunityUpdatePage.typeSelectLastOption();
        await opportunityUpdatePage.setSummaryInput('summary');
        expect(await opportunityUpdatePage.getSummaryInput()).to.match(/summary/);
        await opportunityUpdatePage.setFundSizeInput('fundSize');
        expect(await opportunityUpdatePage.getFundSizeInput()).to.match(/fundSize/);
        await opportunityUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await opportunityUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30');
        await opportunityUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await opportunityUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30');
        const selectedVisible = await opportunityUpdatePage.getVisibleInput().isSelected();
        if (selectedVisible) {
            await opportunityUpdatePage.getVisibleInput().click();
            expect(await opportunityUpdatePage.getVisibleInput().isSelected()).to.be.false;
        } else {
            await opportunityUpdatePage.getVisibleInput().click();
            expect(await opportunityUpdatePage.getVisibleInput().isSelected()).to.be.true;
        }
        await opportunityUpdatePage.setInterestRateInput('5');
        expect(await opportunityUpdatePage.getInterestRateInput()).to.eq('5');
        await opportunityUpdatePage.setTenorInput('5');
        expect(await opportunityUpdatePage.getTenorInput()).to.eq('5');
        await opportunityUpdatePage.setEffectiveAprInput('5');
        expect(await opportunityUpdatePage.getEffectiveAprInput()).to.eq('5');
        await opportunityUpdatePage.setMinimumInvestmentInput('5');
        expect(await opportunityUpdatePage.getMinimumInvestmentInput()).to.eq('5');
        await opportunityUpdatePage.setDenominationInput('5');
        expect(await opportunityUpdatePage.getDenominationInput()).to.eq('5');
        await opportunityUpdatePage.providerSelectLastOption();
        await waitUntilDisplayed(opportunityUpdatePage.saveButton);
        await opportunityUpdatePage.save();
        await waitUntilHidden(opportunityUpdatePage.saveButton);
        expect(await isVisible(opportunityUpdatePage.saveButton)).to.be.false;

        expect(await opportunityComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(opportunityComponentsPage.table);

        await waitUntilCount(opportunityComponentsPage.records, beforeRecordsCount + 1);
        expect(await opportunityComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last Opportunity', async () => {

        const deleteButton = opportunityComponentsPage.getDeleteButton(opportunityComponentsPage.records.last());
        await click(deleteButton);

        opportunityDeleteDialog = new OpportunityDeleteDialog();
        await waitUntilDisplayed(opportunityDeleteDialog.deleteModal);
        expect(await opportunityDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ratesApp.opportunity.delete.question/);
        await opportunityDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(opportunityDeleteDialog.deleteModal);

        expect(await isVisible(opportunityDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([opportunityComponentsPage.noRecords,
        opportunityComponentsPage.table]);
    
        const afterCount = await isVisible(opportunityComponentsPage.noRecords) ? 0 : await getRecordsCount(opportunityComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
