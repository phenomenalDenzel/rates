import { element, by, ElementFinder } from 'protractor';

export default class ApplicationUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.application.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  applicationIdInput: ElementFinder = element(by.css('input#application-applicationId'));
  statusSelect: ElementFinder = element(by.css('select#application-status'));
  amountInput: ElementFinder = element(by.css('input#application-amount'));
  customerSelect: ElementFinder = element(by.css('select#application-customer'));
  opportunitySelect: ElementFinder = element(by.css('select#application-opportunity'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setApplicationIdInput(applicationId) {
    await this.applicationIdInput.sendKeys(applicationId);
  }

  async getApplicationIdInput() {
    return this.applicationIdInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }
  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return this.amountInput.getAttribute('value');
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
