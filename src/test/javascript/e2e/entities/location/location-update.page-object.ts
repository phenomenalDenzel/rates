import { element, by, ElementFinder } from 'protractor';

export default class LocationUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.location.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  addressLine1Input: ElementFinder = element(by.css('input#location-addressLine1'));
  addressLine2Input: ElementFinder = element(by.css('input#location-addressLine2'));
  customerSelect: ElementFinder = element(by.css('select#location-customer'));
  localGovtSelect: ElementFinder = element(by.css('select#location-localGovt'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAddressLine1Input(addressLine1) {
    await this.addressLine1Input.sendKeys(addressLine1);
  }

  async getAddressLine1Input() {
    return this.addressLine1Input.getAttribute('value');
  }

  async setAddressLine2Input(addressLine2) {
    await this.addressLine2Input.sendKeys(addressLine2);
  }

  async getAddressLine2Input() {
    return this.addressLine2Input.getAttribute('value');
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

  async localGovtSelectLastOption() {
    await this.localGovtSelect.all(by.tagName('option')).last().click();
  }

  async localGovtSelectOption(option) {
    await this.localGovtSelect.sendKeys(option);
  }

  getLocalGovtSelect() {
    return this.localGovtSelect;
  }

  async getLocalGovtSelectedOption() {
    return this.localGovtSelect.element(by.css('option:checked')).getText();
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
