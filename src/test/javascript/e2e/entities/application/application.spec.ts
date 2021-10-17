import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ApplicationComponentsPage, { ApplicationDeleteDialog } from './application.page-object';
import ApplicationUpdatePage from './application-update.page-object';
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

describe('Application e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let applicationComponentsPage: ApplicationComponentsPage;
  let applicationUpdatePage: ApplicationUpdatePage;
  /* let applicationDeleteDialog: ApplicationDeleteDialog; */
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

  it('should load Applications', async () => {
    await navBarPage.getEntityPage('application');
    applicationComponentsPage = new ApplicationComponentsPage();
    expect(await applicationComponentsPage.title.getText()).to.match(/Applications/);

    expect(await applicationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([applicationComponentsPage.noRecords, applicationComponentsPage.table]);

    beforeRecordsCount = (await isVisible(applicationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(applicationComponentsPage.table);
  });

  it('should load create Application page', async () => {
    await applicationComponentsPage.createButton.click();
    applicationUpdatePage = new ApplicationUpdatePage();
    expect(await applicationUpdatePage.getPageTitle().getAttribute('id')).to.match(/ratesApp.application.home.createOrEditLabel/);
    await applicationUpdatePage.cancel();
  });

  /*  it('should create and save Applications', async () => {
        await applicationComponentsPage.createButton.click();
        await applicationUpdatePage.setApplicationIdInput('applicationId');
        expect(await applicationUpdatePage.getApplicationIdInput()).to.match(/applicationId/);
        await applicationUpdatePage.statusSelectLastOption();
        await applicationUpdatePage.setAmountInput('5');
        expect(await applicationUpdatePage.getAmountInput()).to.eq('5');
        await applicationUpdatePage.customerSelectLastOption();
        await applicationUpdatePage.opportunitySelectLastOption();
        await waitUntilDisplayed(applicationUpdatePage.saveButton);
        await applicationUpdatePage.save();
        await waitUntilHidden(applicationUpdatePage.saveButton);
        expect(await isVisible(applicationUpdatePage.saveButton)).to.be.false;

        expect(await applicationComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(applicationComponentsPage.table);

        await waitUntilCount(applicationComponentsPage.records, beforeRecordsCount + 1);
        expect(await applicationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last Application', async () => {

        const deleteButton = applicationComponentsPage.getDeleteButton(applicationComponentsPage.records.last());
        await click(deleteButton);

        applicationDeleteDialog = new ApplicationDeleteDialog();
        await waitUntilDisplayed(applicationDeleteDialog.deleteModal);
        expect(await applicationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ratesApp.application.delete.question/);
        await applicationDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(applicationDeleteDialog.deleteModal);

        expect(await isVisible(applicationDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([applicationComponentsPage.noRecords,
        applicationComponentsPage.table]);
    
        const afterCount = await isVisible(applicationComponentsPage.noRecords) ? 0 : await getRecordsCount(applicationComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
