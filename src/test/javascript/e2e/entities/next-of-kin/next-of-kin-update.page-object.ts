import { element, by, ElementFinder } from 'protractor';

export default class NextOfKinUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.nextOfKin.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleSelect: ElementFinder = element(by.css('select#next-of-kin-title'));
  relationSelect: ElementFinder = element(by.css('select#next-of-kin-relation'));
  nameInput: ElementFinder = element(by.css('input#next-of-kin-name'));
  phoneNumberInput: ElementFinder = element(by.css('input#next-of-kin-phoneNumber'));
  customerSelect: ElementFinder = element(by.css('select#next-of-kin-customer'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleSelect(title) {
    await this.titleSelect.sendKeys(title);
  }

  async getTitleSelect() {
    return this.titleSelect.element(by.css('option:checked')).getText();
  }

  async titleSelectLastOption() {
    await this.titleSelect.all(by.tagName('option')).last().click();
  }
  async setRelationSelect(relation) {
    await this.relationSelect.sendKeys(relation);
  }

  async getRelationSelect() {
    return this.relationSelect.element(by.css('option:checked')).getText();
  }

  async relationSelectLastOption() {
    await this.relationSelect.all(by.tagName('option')).last().click();
  }
  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
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
