import { element, by, ElementFinder } from 'protractor';

export default class OpportunityDocumentUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.opportunityDocument.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#opportunity-document-name'));
  descriptionInput: ElementFinder = element(by.css('input#opportunity-document-description'));
  fileInput: ElementFinder = element(by.css('input#file_file'));
  archivedInput: ElementFinder = element(by.css('input#opportunity-document-archived'));
  archiveUrlInput: ElementFinder = element(by.css('input#opportunity-document-archiveUrl'));
  opportunitySelect: ElementFinder = element(by.css('select#opportunity-document-opportunity'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setFileInput(file) {
    await this.fileInput.sendKeys(file);
  }

  async getFileInput() {
    return this.fileInput.getAttribute('value');
  }

  getArchivedInput() {
    return this.archivedInput;
  }
  async setArchiveUrlInput(archiveUrl) {
    await this.archiveUrlInput.sendKeys(archiveUrl);
  }

  async getArchiveUrlInput() {
    return this.archiveUrlInput.getAttribute('value');
  }

  async opportunitySelectLastOption() {
    await this.opportunitySelect.all(by.tagName('option')).last().click();
  }

  async opportunitySelectOption(option) {
    await this.opportunitySelect.sendKeys(option);
  }

  getOpportunitySelect() {
    return this.opportunitySelect;
  }

  async getOpportunitySelectedOption() {
    return this.opportunitySelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
