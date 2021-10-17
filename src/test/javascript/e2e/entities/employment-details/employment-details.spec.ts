import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmploymentDetailsComponentsPage, { EmploymentDetailsDeleteDialog } from './employment-details.page-object';
import EmploymentDetailsUpdatePage from './employment-details-update.page-object';
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

describe('EmploymentDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employmentDetailsComponentsPage: EmploymentDetailsComponentsPage;
  let employmentDetailsUpdatePage: EmploymentDetailsUpdatePage;
  /* let employmentDetailsDeleteDialog: EmploymentDetailsDeleteDialog; */
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

  it('should load EmploymentDetails', async () => {
    await navBarPage.getEntityPage('employment-details');
    employmentDetailsComponentsPage = new EmploymentDetailsComponentsPage();
    expect(await employmentDetailsComponentsPage.title.getText()).to.match(/Employment Details/);

    expect(await employmentDetailsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([employmentDetailsComponentsPage.noRecords, employmentDetailsComponentsPage.table]);

    beforeRecordsCount = (await isVisible(employmentDetailsComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(employmentDetailsComponentsPage.table);
  });

  it('should load create EmploymentDetails page', async () => {
    await employmentDetailsComponentsPage.createButton.click();
    employmentDetailsUpdatePage = new EmploymentDetailsUpdatePage();
    expect(await employmentDetailsUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ratesApp.employmentDetails.home.createOrEditLabel/
    );
    await employmentDetailsUpdatePage.cancel();
  });

  /*  it('should create and save EmploymentDetails', async () => {
        await employmentDetailsComponentsPage.createButton.click();
        await employmentDetailsUpdatePage.setCompanyNameInput('companyName');
        expect(await employmentDetailsUpdatePage.getCompanyNameInput()).to.match(/companyName/);
        await employmentDetailsUpdatePage.setOfficialWebsiteInput('officialWebsite');
        expect(await employmentDetailsUpdatePage.getOfficialWebsiteInput()).to.match(/officialWebsite/);
        await employmentDetailsUpdatePage.setAddressLine1Input('addressLine1');
        expect(await employmentDetailsUpdatePage.getAddressLine1Input()).to.match(/addressLine1/);
        await employmentDetailsUpdatePage.setAddressLine2Input('addressLine2');
        expect(await employmentDetailsUpdatePage.getAddressLine2Input()).to.match(/addressLine2/);
        await employmentDetailsUpdatePage.customerSelectLastOption();
        await employmentDetailsUpdatePage.localGovtSelectLastOption();
        await waitUntilDisplayed(employmentDetailsUpdatePage.saveButton);
        await employmentDetailsUpdatePage.save();
        await waitUntilHidden(employmentDetailsUpdatePage.saveButton);
        expect(await isVisible(employmentDetailsUpdatePage.saveButton)).to.be.false;

        expect(await employmentDetailsComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(employmentDetailsComponentsPage.table);

        await waitUntilCount(employmentDetailsComponentsPage.records, beforeRecordsCount + 1);
        expect(await employmentDetailsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last EmploymentDetails', async () => {

        const deleteButton = employmentDetailsComponentsPage.getDeleteButton(employmentDetailsComponentsPage.records.last());
        await click(deleteButton);

        employmentDetailsDeleteDialog = new EmploymentDetailsDeleteDialog();
        await waitUntilDisplayed(employmentDetailsDeleteDialog.deleteModal);
        expect(await employmentDetailsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ratesApp.employmentDetails.delete.question/);
        await employmentDetailsDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(employmentDetailsDeleteDialog.deleteModal);

        expect(await isVisible(employmentDetailsDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([employmentDetailsComponentsPage.noRecords,
        employmentDetailsComponentsPage.table]);
    
        const afterCount = await isVisible(employmentDetailsComponentsPage.noRecords) ? 0 : await getRecordsCount(employmentDetailsComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
