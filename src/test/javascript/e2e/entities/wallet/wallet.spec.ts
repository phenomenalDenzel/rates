import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WalletComponentsPage, { WalletDeleteDialog } from './wallet.page-object';
import WalletUpdatePage from './wallet-update.page-object';
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

describe('Wallet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let walletComponentsPage: WalletComponentsPage;
  let walletUpdatePage: WalletUpdatePage;
  /* let walletDeleteDialog: WalletDeleteDialog; */
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

  it('should load Wallets', async () => {
    await navBarPage.getEntityPage('wallet');
    walletComponentsPage = new WalletComponentsPage();
    expect(await walletComponentsPage.title.getText()).to.match(/Wallets/);

    expect(await walletComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([walletComponentsPage.noRecords, walletComponentsPage.table]);

    beforeRecordsCount = (await isVisible(walletComponentsPage.noRecords)) ? 0 : await getRecordsCount(walletComponentsPage.table);
  });

  it('should load create Wallet page', async () => {
    await walletComponentsPage.createButton.click();
    walletUpdatePage = new WalletUpdatePage();
    expect(await walletUpdatePage.getPageTitle().getAttribute('id')).to.match(/ratesApp.wallet.home.createOrEditLabel/);
    await walletUpdatePage.cancel();
  });

  /*  it('should create and save Wallets', async () => {
        await walletComponentsPage.createButton.click();
        await walletUpdatePage.setExternalIdInput('externalId');
        expect(await walletUpdatePage.getExternalIdInput()).to.match(/externalId/);
        await walletUpdatePage.setBalanceInput('5');
        expect(await walletUpdatePage.getBalanceInput()).to.eq('5');
        await walletUpdatePage.customerSelectLastOption();
        await waitUntilDisplayed(walletUpdatePage.saveButton);
        await walletUpdatePage.save();
        await waitUntilHidden(walletUpdatePage.saveButton);
        expect(await isVisible(walletUpdatePage.saveButton)).to.be.false;

        expect(await walletComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(walletComponentsPage.table);

        await waitUntilCount(walletComponentsPage.records, beforeRecordsCount + 1);
        expect(await walletComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last Wallet', async () => {

        const deleteButton = walletComponentsPage.getDeleteButton(walletComponentsPage.records.last());
        await click(deleteButton);

        walletDeleteDialog = new WalletDeleteDialog();
        await waitUntilDisplayed(walletDeleteDialog.deleteModal);
        expect(await walletDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ratesApp.wallet.delete.question/);
        await walletDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(walletDeleteDialog.deleteModal);

        expect(await isVisible(walletDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([walletComponentsPage.noRecords,
        walletComponentsPage.table]);
    
        const afterCount = await isVisible(walletComponentsPage.noRecords) ? 0 : await getRecordsCount(walletComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
