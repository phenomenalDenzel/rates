import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NextOfKinComponentsPage, { NextOfKinDeleteDialog } from './next-of-kin.page-object';
import NextOfKinUpdatePage from './next-of-kin-update.page-object';
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

describe('NextOfKin e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nextOfKinComponentsPage: NextOfKinComponentsPage;
  let nextOfKinUpdatePage: NextOfKinUpdatePage;
  /* let nextOfKinDeleteDialog: NextOfKinDeleteDialog; */
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

  it('should load NextOfKins', async () => {
    await navBarPage.getEntityPage('next-of-kin');
    nextOfKinComponentsPage = new NextOfKinComponentsPage();
    expect(await nextOfKinComponentsPage.title.getText()).to.match(/Next Of Kins/);

    expect(await nextOfKinComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([nextOfKinComponentsPage.noRecords, nextOfKinComponentsPage.table]);

    beforeRecordsCount = (await isVisible(nextOfKinComponentsPage.noRecords)) ? 0 : await getRecordsCount(nextOfKinComponentsPage.table);
  });

  it('should load create NextOfKin page', async () => {
    await nextOfKinComponentsPage.createButton.click();
    nextOfKinUpdatePage = new NextOfKinUpdatePage();
    expect(await nextOfKinUpdatePage.getPageTitle().getAttribute('id')).to.match(/ratesApp.nextOfKin.home.createOrEditLabel/);
    await nextOfKinUpdatePage.cancel();
  });

  /*  it('should create and save NextOfKins', async () => {
        await nextOfKinComponentsPage.createButton.click();
        await nextOfKinUpdatePage.titleSelectLastOption();
        await nextOfKinUpdatePage.relationSelectLastOption();
        await nextOfKinUpdatePage.setNameInput('name');
        expect(await nextOfKinUpdatePage.getNameInput()).to.match(/name/);
        await nextOfKinUpdatePage.setPhoneNumberInput('phoneNumber');
        expect(await nextOfKinUpdatePage.getPhoneNumberInput()).to.match(/phoneNumber/);
        await nextOfKinUpdatePage.customerSelectLastOption();
        await waitUntilDisplayed(nextOfKinUpdatePage.saveButton);
        await nextOfKinUpdatePage.save();
        await waitUntilHidden(nextOfKinUpdatePage.saveButton);
        expect(await isVisible(nextOfKinUpdatePage.saveButton)).to.be.false;

        expect(await nextOfKinComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(nextOfKinComponentsPage.table);

        await waitUntilCount(nextOfKinComponentsPage.records, beforeRecordsCount + 1);
        expect(await nextOfKinComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last NextOfKin', async () => {

        const deleteButton = nextOfKinComponentsPage.getDeleteButton(nextOfKinComponentsPage.records.last());
        await click(deleteButton);

        nextOfKinDeleteDialog = new NextOfKinDeleteDialog();
        await waitUntilDisplayed(nextOfKinDeleteDialog.deleteModal);
        expect(await nextOfKinDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ratesApp.nextOfKin.delete.question/);
        await nextOfKinDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(nextOfKinDeleteDialog.deleteModal);

        expect(await isVisible(nextOfKinDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([nextOfKinComponentsPage.noRecords,
        nextOfKinComponentsPage.table]);
    
        const afterCount = await isVisible(nextOfKinComponentsPage.noRecords) ? 0 : await getRecordsCount(nextOfKinComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
