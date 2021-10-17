import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WalletOperationComponentsPage, { WalletOperationDeleteDialog } from './wallet-operation.page-object';
import WalletOperationUpdatePage from './wallet-operation-update.page-object';
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

describe('WalletOperation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let walletOperationComponentsPage: WalletOperationComponentsPage;
  let walletOperationUpdatePage: WalletOperationUpdatePage;
  /* let walletOperationDeleteDialog: WalletOperationDeleteDialog; */
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

  it('should load WalletOperations', async () => {
    await navBarPage.getEntityPage('wallet-operation');
    walletOperationComponentsPage = new WalletOperationComponentsPage();
    expect(await walletOperationComponentsPage.title.getText()).to.match(/Wallet Operations/);

    expect(await walletOperationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([walletOperationComponentsPage.noRecords, walletOperationComponentsPage.table]);

    beforeRecordsCount = (await isVisible(walletOperationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(walletOperationComponentsPage.table);
  });

  it('should load create WalletOperation page', async () => {
    await walletOperationComponentsPage.createButton.click();
    walletOperationUpdatePage = new WalletOperationUpdatePage();
    expect(await walletOperationUpdatePage.getPageTitle().getAttribute('id')).to.match(/ratesApp.walletOperation.home.createOrEditLabel/);
    await walletOperationUpdatePage.cancel();
  });

  /*  it('should create and save WalletOperations', async () => {
        await walletOperationComponentsPage.createButton.click();
        await walletOperationUpdatePage.setDescriptionInput('description');
        expect(await walletOperationUpdatePage.getDescriptionInput()).to.match(/description/);
        await walletOperationUpdatePage.setAmountInput('5');
        expect(await walletOperationUpdatePage.getAmountInput()).to.eq('5');
        await walletOperationUpdatePage.operationSelectLastOption();
        await walletOperationUpdatePage.walletSelectLastOption();
        await waitUntilDisplayed(walletOperationUpdatePage.saveButton);
        await walletOperationUpdatePage.save();
        await waitUntilHidden(walletOperationUpdatePage.saveButton);
        expect(await isVisible(walletOperationUpdatePage.saveButton)).to.be.false;

        expect(await walletOperationComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(walletOperationComponentsPage.table);

        await waitUntilCount(walletOperationComponentsPage.records, beforeRecordsCount + 1);
        expect(await walletOperationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last WalletOperation', async () => {

        const deleteButton = walletOperationComponentsPage.getDeleteButton(walletOperationComponentsPage.records.last());
        await click(deleteButton);

        walletOperationDeleteDialog = new WalletOperationDeleteDialog();
        await waitUntilDisplayed(walletOperationDeleteDialog.deleteModal);
        expect(await walletOperationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ratesApp.walletOperation.delete.question/);
        await walletOperationDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(walletOperationDeleteDialog.deleteModal);

        expect(await isVisible(walletOperationDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([walletOperationComponentsPage.noRecords,
        walletOperationComponentsPage.table]);
    
        const afterCount = await isVisible(walletOperationComponentsPage.noRecords) ? 0 : await getRecordsCount(walletOperationComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
