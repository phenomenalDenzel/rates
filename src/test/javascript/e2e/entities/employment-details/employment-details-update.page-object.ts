import { element, by, ElementFinder } from 'protractor';

export default class EmploymentDetailsUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.employmentDetails.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  companyNameInput: ElementFinder = element(by.css('input#employment-details-companyName'));
  officialWebsiteInput: ElementFinder = element(by.css('input#employment-details-officialWebsite'));
  addressLine1Input: ElementFinder = element(by.css('input#employment-details-addressLine1'));
  addressLine2Input: ElementFinder = element(by.css('input#employment-details-addressLine2'));
  customerSelect: ElementFinder = element(by.css('select#employment-details-customer'));
  localGovtSelect: ElementFinder = element(by.css('select#employment-details-localGovt'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCompanyNameInput(companyName) {
    await this.companyNameInput.sendKeys(companyName);
  }

  async getCompanyNameInput() {
    return this.companyNameInput.getAttribute('value');
  }

  async setOfficialWebsiteInput(officialWebsite) {
    await this.officialWebsiteInput.sendKeys(officialWebsite);
  }

  async getOfficialWebsiteInput() {
    return this.officialWebsiteInput.getAttribute('value');
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
