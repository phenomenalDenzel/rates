import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VerificationComponentsPage, { VerificationDeleteDialog } from './verification.page-object';
import VerificationUpdatePage from './verification-update.page-object';
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

describe('Verification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let verificationComponentsPage: VerificationComponentsPage;
  let verificationUpdatePage: VerificationUpdatePage;
  /* let verificationDeleteDialog: VerificationDeleteDialog; */
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

  it('should load Verifications', async () => {
    await navBarPage.getEntityPage('verification');
    verificationComponentsPage = new VerificationComponentsPage();
    expect(await verificationComponentsPage.title.getText()).to.match(/Verifications/);

    expect(await verificationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([verificationComponentsPage.noRecords, verificationComponentsPage.table]);

    beforeRecordsCount = (await isVisible(verificationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(verificationComponentsPage.table);
  });

  it('should load create Verification page', async () => {
    await verificationComponentsPage.createButton.click();
    verificationUpdatePage = new VerificationUpdatePage();
    expect(await verificationUpdatePage.getPageTitle().getAttribute('id')).to.match(/ratesApp.verification.home.createOrEditLabel/);
    await verificationUpdatePage.cancel();
  });

  /*  it('should create and save Verifications', async () => {
        await verificationComponentsPage.createButton.click();
        await verificationUpdatePage.itemNameSelectLastOption();
        await verificationUpdatePage.setDescriptionInput('description');
        expect(await verificationUpdatePage.getDescriptionInput()).to.match(/description/);
        await verificationUpdatePage.setImageInput(absolutePath);
        const selectedArchived = await verificationUpdatePage.getArchivedInput().isSelected();
        if (selectedArchived) {
            await verificationUpdatePage.getArchivedInput().click();
            expect(await verificationUpdatePage.getArchivedInput().isSelected()).to.be.false;
        } else {
            await verificationUpdatePage.getArchivedInput().click();
            expect(await verificationUpdatePage.getArchivedInput().isSelected()).to.be.true;
        }
        await verificationUpdatePage.setArchiveUrlInput('archiveUrl');
        expect(await verificationUpdatePage.getArchiveUrlInput()).to.match(/archiveUrl/);
        await verificationUpdatePage.customerSelectLastOption();
        await waitUntilDisplayed(verificationUpdatePage.saveButton);
        await verificationUpdatePage.save();
        await waitUntilHidden(verificationUpdatePage.saveButton);
        expect(await isVisible(verificationUpdatePage.saveButton)).to.be.false;

        expect(await verificationComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(verificationComponentsPage.table);

        await waitUntilCount(verificationComponentsPage.records, beforeRecordsCount + 1);
        expect(await verificationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last Verification', async () => {

        const deleteButton = verificationComponentsPage.getDeleteButton(verificationComponentsPage.records.last());
        await click(deleteButton);

        verificationDeleteDialog = new VerificationDeleteDialog();
        await waitUntilDisplayed(verificationDeleteDialog.deleteModal);
        expect(await verificationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ratesApp.verification.delete.question/);
        await verificationDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(verificationDeleteDialog.deleteModal);

        expect(await isVisible(verificationDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([verificationComponentsPage.noRecords,
        verificationComponentsPage.table]);
    
        const afterCount = await isVisible(verificationComponentsPage.noRecords) ? 0 : await getRecordsCount(verificationComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
