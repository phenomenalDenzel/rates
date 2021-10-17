import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OtpComponentsPage, { OtpDeleteDialog } from './otp.page-object';
import OtpUpdatePage from './otp-update.page-object';
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

describe('Otp e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let otpComponentsPage: OtpComponentsPage;
  let otpUpdatePage: OtpUpdatePage;
  let otpDeleteDialog: OtpDeleteDialog;
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

  it('should load Otps', async () => {
    await navBarPage.getEntityPage('otp');
    otpComponentsPage = new OtpComponentsPage();
    expect(await otpComponentsPage.title.getText()).to.match(/Otps/);

    expect(await otpComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([otpComponentsPage.noRecords, otpComponentsPage.table]);

    beforeRecordsCount = (await isVisible(otpComponentsPage.noRecords)) ? 0 : await getRecordsCount(otpComponentsPage.table);
  });

  it('should load create Otp page', async () => {
    await otpComponentsPage.createButton.click();
    otpUpdatePage = new OtpUpdatePage();
    expect(await otpUpdatePage.getPageTitle().getAttribute('id')).to.match(/ratesApp.otp.home.createOrEditLabel/);
    await otpUpdatePage.cancel();
  });

  it('should create and save Otps', async () => {
    await otpComponentsPage.createButton.click();
    await otpUpdatePage.setCodeInput('code');
    expect(await otpUpdatePage.getCodeInput()).to.match(/code/);
    await otpUpdatePage.actionSelectLastOption();
    await otpUpdatePage.setEmailInput('email');
    expect(await otpUpdatePage.getEmailInput()).to.match(/email/);
    await otpUpdatePage.setCreatedTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await otpUpdatePage.getCreatedTimeInput()).to.contain('2001-01-01T02:30');
    const selectedUsed = await otpUpdatePage.getUsedInput().isSelected();
    if (selectedUsed) {
      await otpUpdatePage.getUsedInput().click();
      expect(await otpUpdatePage.getUsedInput().isSelected()).to.be.false;
    } else {
      await otpUpdatePage.getUsedInput().click();
      expect(await otpUpdatePage.getUsedInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(otpUpdatePage.saveButton);
    await otpUpdatePage.save();
    await waitUntilHidden(otpUpdatePage.saveButton);
    expect(await isVisible(otpUpdatePage.saveButton)).to.be.false;

    expect(await otpComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(otpComponentsPage.table);

    await waitUntilCount(otpComponentsPage.records, beforeRecordsCount + 1);
    expect(await otpComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Otp', async () => {
    const deleteButton = otpComponentsPage.getDeleteButton(otpComponentsPage.records.last());
    await click(deleteButton);

    otpDeleteDialog = new OtpDeleteDialog();
    await waitUntilDisplayed(otpDeleteDialog.deleteModal);
    expect(await otpDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ratesApp.otp.delete.question/);
    await otpDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(otpDeleteDialog.deleteModal);

    expect(await isVisible(otpDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([otpComponentsPage.noRecords, otpComponentsPage.table]);

    const afterCount = (await isVisible(otpComponentsPage.noRecords)) ? 0 : await getRecordsCount(otpComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
