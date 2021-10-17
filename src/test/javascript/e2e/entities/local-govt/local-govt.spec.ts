import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LocalGovtComponentsPage, { LocalGovtDeleteDialog } from './local-govt.page-object';
import LocalGovtUpdatePage from './local-govt-update.page-object';
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

describe('LocalGovt e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localGovtComponentsPage: LocalGovtComponentsPage;
  let localGovtUpdatePage: LocalGovtUpdatePage;
  let localGovtDeleteDialog: LocalGovtDeleteDialog;
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

  it('should load LocalGovts', async () => {
    await navBarPage.getEntityPage('local-govt');
    localGovtComponentsPage = new LocalGovtComponentsPage();
    expect(await localGovtComponentsPage.title.getText()).to.match(/Local Govts/);

    expect(await localGovtComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([localGovtComponentsPage.noRecords, localGovtComponentsPage.table]);

    beforeRecordsCount = (await isVisible(localGovtComponentsPage.noRecords)) ? 0 : await getRecordsCount(localGovtComponentsPage.table);
  });

  it('should load create LocalGovt page', async () => {
    await localGovtComponentsPage.createButton.click();
    localGovtUpdatePage = new LocalGovtUpdatePage();
    expect(await localGovtUpdatePage.getPageTitle().getAttribute('id')).to.match(/ratesApp.localGovt.home.createOrEditLabel/);
    await localGovtUpdatePage.cancel();
  });

  it('should create and save LocalGovts', async () => {
    await localGovtComponentsPage.createButton.click();
    await localGovtUpdatePage.setNameInput('name');
    expect(await localGovtUpdatePage.getNameInput()).to.match(/name/);
    await localGovtUpdatePage.stateSelectLastOption();
    const selectedActive = await localGovtUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await localGovtUpdatePage.getActiveInput().click();
      expect(await localGovtUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await localGovtUpdatePage.getActiveInput().click();
      expect(await localGovtUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(localGovtUpdatePage.saveButton);
    await localGovtUpdatePage.save();
    await waitUntilHidden(localGovtUpdatePage.saveButton);
    expect(await isVisible(localGovtUpdatePage.saveButton)).to.be.false;

    expect(await localGovtComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(localGovtComponentsPage.table);

    await waitUntilCount(localGovtComponentsPage.records, beforeRecordsCount + 1);
    expect(await localGovtComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last LocalGovt', async () => {
    const deleteButton = localGovtComponentsPage.getDeleteButton(localGovtComponentsPage.records.last());
    await click(deleteButton);

    localGovtDeleteDialog = new LocalGovtDeleteDialog();
    await waitUntilDisplayed(localGovtDeleteDialog.deleteModal);
    expect(await localGovtDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ratesApp.localGovt.delete.question/);
    await localGovtDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(localGovtDeleteDialog.deleteModal);

    expect(await isVisible(localGovtDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([localGovtComponentsPage.noRecords, localGovtComponentsPage.table]);

    const afterCount = (await isVisible(localGovtComponentsPage.noRecords)) ? 0 : await getRecordsCount(localGovtComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
