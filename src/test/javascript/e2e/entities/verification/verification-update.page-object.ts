import { element, by, ElementFinder } from 'protractor';

export default class VerificationUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.verification.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  itemNameSelect: ElementFinder = element(by.css('select#verification-itemName'));
  descriptionInput: ElementFinder = element(by.css('input#verification-description'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  archivedInput: ElementFinder = element(by.css('input#verification-archived'));
  archiveUrlInput: ElementFinder = element(by.css('input#verification-archiveUrl'));
  customerSelect: ElementFinder = element(by.css('select#verification-customer'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setItemNameSelect(itemName) {
    await this.itemNameSelect.sendKeys(itemName);
  }

  async getItemNameSelect() {
    return this.itemNameSelect.element(by.css('option:checked')).getText();
  }

  async itemNameSelectLastOption() {
    await this.itemNameSelect.all(by.tagName('option')).last().click();
  }
  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return this.imageInput.getAttribute('value');
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

  async customerSelectLastOption() {
    await this.customerSelect.all(by.tagName('option')).last().click();
  }

  async customerSelectOption(option) {
    await this.customerSelect.sendKeys(option);
  }

  getCustomerSelect() {
    return this.customerSelect;
  }

  async getCustomerSelectedOption() {
    return this.customerSelect.element(by.css('option:checked')).getText();
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
