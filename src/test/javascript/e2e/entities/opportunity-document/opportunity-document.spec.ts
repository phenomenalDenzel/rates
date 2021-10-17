import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OpportunityDocumentComponentsPage, { OpportunityDocumentDeleteDialog } from './opportunity-document.page-object';
import OpportunityDocumentUpdatePage from './opportunity-document-update.page-object';
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

describe('OpportunityDocument e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let opportunityDocumentComponentsPage: OpportunityDocumentComponentsPage;
  let opportunityDocumentUpdatePage: OpportunityDocumentUpdatePage;
  /* let opportunityDocumentDeleteDialog: OpportunityDocumentDeleteDialog; */
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

  it('should load OpportunityDocuments', async () => {
    await navBarPage.getEntityPage('opportunity-document');
    opportunityDocumentComponentsPage = new OpportunityDocumentComponentsPage();
    expect(await opportunityDocumentComponentsPage.title.getText()).to.match(/Opportunity Documents/);

    expect(await opportunityDocumentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([opportunityDocumentComponentsPage.noRecords, opportunityDocumentComponentsPage.table]);

    beforeRecordsCount = (await isVisible(opportunityDocumentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(opportunityDocumentComponentsPage.table);
  });

  it('should load create OpportunityDocument page', async () => {
    await opportunityDocumentComponentsPage.createButton.click();
    opportunityDocumentUpdatePage = new OpportunityDocumentUpdatePage();
    expect(await opportunityDocumentUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ratesApp.opportunityDocument.home.createOrEditLabel/
    );
    await opportunityDocumentUpdatePage.cancel();
  });

  /*  it('should create and save OpportunityDocuments', async () => {
        await opportunityDocumentComponentsPage.createButton.click();
        await opportunityDocumentUpdatePage.setNameInput('name');
        expect(await opportunityDocumentUpdatePage.getNameInput()).to.match(/name/);
        await opportunityDocumentUpdatePage.setDescriptionInput('description');
        expect(await opportunityDocumentUpdatePage.getDescriptionInput()).to.match(/description/);
        await opportunityDocumentUpdatePage.setFileInput(absolutePath);
        const selectedArchived = await opportunityDocumentUpdatePage.getArchivedInput().isSelected();
        if (selectedArchived) {
            await opportunityDocumentUpdatePage.getArchivedInput().click();
            expect(await opportunityDocumentUpdatePage.getArchivedInput().isSelected()).to.be.false;
        } else {
            await opportunityDocumentUpdatePage.getArchivedInput().click();
            expect(await opportunityDocumentUpdatePage.getArchivedInput().isSelected()).to.be.true;
        }
        await opportunityDocumentUpdatePage.setArchiveUrlInput('archiveUrl');
        expect(await opportunityDocumentUpdatePage.getArchiveUrlInput()).to.match(/archiveUrl/);
        await opportunityDocumentUpdatePage.opportunitySelectLastOption();
        await waitUntilDisplayed(opportunityDocumentUpdatePage.saveButton);
        await opportunityDocumentUpdatePage.save();
        await waitUntilHidden(opportunityDocumentUpdatePage.saveButton);
        expect(await isVisible(opportunityDocumentUpdatePage.saveButton)).to.be.false;

        expect(await opportunityDocumentComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(opportunityDocumentComponentsPage.table);

        await waitUntilCount(opportunityDocumentComponentsPage.records, beforeRecordsCount + 1);
        expect(await opportunityDocumentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last OpportunityDocument', async () => {

        const deleteButton = opportunityDocumentComponentsPage.getDeleteButton(opportunityDocumentComponentsPage.records.last());
        await click(deleteButton);

        opportunityDocumentDeleteDialog = new OpportunityDocumentDeleteDialog();
        await waitUntilDisplayed(opportunityDocumentDeleteDialog.deleteModal);
        expect(await opportunityDocumentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ratesApp.opportunityDocument.delete.question/);
        await opportunityDocumentDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(opportunityDocumentDeleteDialog.deleteModal);

        expect(await isVisible(opportunityDocumentDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([opportunityDocumentComponentsPage.noRecords,
        opportunityDocumentComponentsPage.table]);
    
        const afterCount = await isVisible(opportunityDocumentComponentsPage.noRecords) ? 0 : await getRecordsCount(opportunityDocumentComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
