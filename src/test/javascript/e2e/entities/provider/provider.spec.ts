import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProviderComponentsPage, { ProviderDeleteDialog } from './provider.page-object';
import ProviderUpdatePage from './provider-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Provider e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let providerComponentsPage: ProviderComponentsPage;
  let providerUpdatePage: ProviderUpdatePage;
  let providerDeleteDialog: ProviderDeleteDialog;
  const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);
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

  it('should load Providers', async () => {
    await navBarPage.getEntityPage('provider');
    providerComponentsPage = new ProviderComponentsPage();
    expect(await providerComponentsPage.title.getText()).to.match(/Providers/);

    expect(await providerComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([providerComponentsPage.noRecords, providerComponentsPage.table]);

    beforeRecordsCount = (await isVisible(providerComponentsPage.noRecords)) ? 0 : await getRecordsCount(providerComponentsPage.table);
  });

  it('should load create Provider page', async () => {
    await providerComponentsPage.createButton.click();
    providerUpdatePage = new ProviderUpdatePage();
    expect(await providerUpdatePage.getPageTitle().getAttribute('id')).to.match(/ratesApp.provider.home.createOrEditLabel/);
    await providerUpdatePage.cancel();
  });

  it('should create and save Providers', async () => {
    await providerComponentsPage.createButton.click();
    await providerUpdatePage.setNameInput('name');
    expect(await providerUpdatePage.getNameInput()).to.match(/name/);
    await providerUpdatePage.setLogoInput(absolutePath);
    await providerUpdatePage.setContactInfoInput('contactInfo');
    expect(await providerUpdatePage.getContactInfoInput()).to.match(/contactInfo/);
    await waitUntilDisplayed(providerUpdatePage.saveButton);
    await providerUpdatePage.save();
    await waitUntilHidden(providerUpdatePage.saveButton);
    expect(await isVisible(providerUpdatePage.saveButton)).to.be.false;

    expect(await providerComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(providerComponentsPage.table);

    await waitUntilCount(providerComponentsPage.records, beforeRecordsCount + 1);
    expect(await providerComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Provider', async () => {
    const deleteButton = providerComponentsPage.getDeleteButton(providerComponentsPage.records.last());
    await click(deleteButton);

    providerDeleteDialog = new ProviderDeleteDialog();
    await waitUntilDisplayed(providerDeleteDialog.deleteModal);
    expect(await providerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ratesApp.provider.delete.question/);
    await providerDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(providerDeleteDialog.deleteModal);

    expect(await isVisible(providerDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([providerComponentsPage.noRecords, providerComponentsPage.table]);

    const afterCount = (await isVisible(providerComponentsPage.noRecords)) ? 0 : await getRecordsCount(providerComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
